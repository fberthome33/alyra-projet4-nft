import contractNftCollection from "../contracts/NftCollection.json";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useOutletContext } from "react-router-dom";
import useGetCollectionDetails from "../hooks/getcollectiondetails";

import truncateEthAddress from 'truncate-eth-address';
//import Error from "./error";
import Loading from "./loading";
import ProfilePicture from "../components/profilepicture";

const Asset = () => {
    
    const [user, web3, contracts] = useOutletContext();    
    const { address } = useParams();
    const { tokenid } = useParams();
    const getCollectionDetails = useGetCollectionDetails(web3, contracts.nftCollectionFactory);

    const [loaded, setLoaded] = useState(false);
    const [collection, setCollection] = useState();
    const [tokenURI, setTokenURI] = useState();

    const creatorPath = (creator) => {
        return '/user/' + creator+'/assets';
    }

    useEffect(async () => {
        let collection = await getCollectionDetails(address);
        setCollection(collection);
        try {
            let nftCollection = new web3.eth.Contract(contractNftCollection.abi, address);
            let tokenURI = await nftCollection.methods.tokenURI(tokenid).call();
            setTokenURI(tokenURI);
            setLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }, []);

    if (!loaded) {
        return <Loading />
    }
    return (
        <main>
            <ProfilePicture uri={tokenURI} />
            <h1>
                NFT {truncateEthAddress(address)} #{tokenid}
            </h1>
            Collection: {collection.name}<br/>
            created by <Link to={creatorPath(collection.creator)}>{truncateEthAddress(collection.creator)}</Link>
        </main>
    );
}

export default Asset;