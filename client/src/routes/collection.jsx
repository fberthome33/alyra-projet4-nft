import React, {useState, useEffect} from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import Board from "../components/board";
import ProfilePicture from "../components/profilepicture";
import Error from "./error";
import Loading from "./loading";

import useGetCollectionDetails from "../hooks/getcollectiondetails";
import truncateEthAddress from "truncate-eth-address";

const Collection = () => {

    const [user, web3, contracts] = useOutletContext();    
    const { address } = useParams();
    const navigate = useNavigate();
    const getCollectionDetails = useGetCollectionDetails(web3, contracts.nftCollectionFactory);
    const [collection, setCollection] = useState();
    const [loaded, setLoaded] = useState(false);
    
    useEffect(async() => {
        let collection = await getCollectionDetails(address);
        setCollection(collection);
        setLoaded(true);
    }, []);

    const createButton = () => {
        if (user && web3.utils.toChecksumAddress(collection.creator) === web3.utils.toChecksumAddress(user.get('ethAddress')) ){
            return (
                <form className="createNew">
                    <button onClick={() => { navigate('/collection/' + address + '/new'); }}>
                        create new NFT
                    </button>
                </form>
            )
        }
    }

    if (!loaded) {
        return <Loading />;
    } else if (!collection) {
        return <Error message="Requested collection not found..." />;
    }
    return (
        <main>
            <ProfilePicture uri={collection.tokenURI} />
            <h1>
                Collection: {collection.name}<br/>
            </h1>
            {createButton()}
            <h2>details</h2>
            <p>
                created on: {collection.timestamp} <br />
                created by: {truncateEthAddress(collection.creator)}
            </p>
            <h2>NFT</h2>
            <Board type="asset" items={collection.assets} />
        </main>
    );
}

export default Collection;