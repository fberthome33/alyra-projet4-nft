import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import Board from "../components/board";
import Loading from "../routes/loading";
import Error from "../routes/error";
import useFetchCollections from "../hooks/fetchcollections";
import useGetCollectionDetails from "../hooks/getcollectiondetails";
import truncateEthAddress from "truncate-eth-address";

const Collections = () => {

    const [user, web3, contracts] = useOutletContext();
    const { address } = useParams();
    const fetchCollections = useFetchCollections(contracts.nftCollectionFactory);
    const getCollectionDetails = useGetCollectionDetails(web3, contracts.nftCollectionFactory);
    const [loaded, setLoaded] = useState(false);
    const [collections, setCollections] = useState([]);

    const title = () => {
        if (user && web3.utils.toChecksumAddress(address) === web3.utils.toChecksumAddress(user.get('ethAddress'))){
            return "My Collections"
        }
        return 'Collections by '+truncateEthAddress(address);
    }

    useEffect(() => {
        let customFilter = {
            _creator: address
        }
        fetchCollections(customFilter).then(async(res) => {
            let fetched = [];
            for (const col of res) {
                let collection = await getCollectionDetails(col.address);
                collection.creator = col.creator;
                fetched.push(collection);
            }
            setCollections(fetched);
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return <Loading />
    } else if (!web3.utils.isAddress(address)) {
        return <Error message="Requested user not found..." />;
    }
    return (
        <main>
            <h1>{title()}</h1>
            <Board type="collection" items={collections} />
        </main>
    );
}

export default Collections;