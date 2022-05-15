import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Board from "../components/board";
import Loading from "../routes/loading";
import Forbidden from "../routes/forbidden";
import useFetchCollections from "../hooks/fetchcollections";
import useGetCollectionDetails from "../hooks/getcollectiondetails";

const Explore = () => {

    const [user, web3, contracts] = useOutletContext();
    const fetchCollections = useFetchCollections(contracts.nftCollectionFactory);
    const getCollectionDetails = useGetCollectionDetails(web3, contracts.nftCollectionFactory);
    const [loaded, setLoaded] = useState(false);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        fetchCollections().then(async (res) => {
            let fetched = [];
            for (const col of res) {
                let collection = await getCollectionDetails(col.address);
                collection.creator = col.creator;
                fetched.push(collection);
            }
            let sorted = fetched.sort((a, b) => {
                return b.timestamp - a.timestamp;
            });
            setCollections(sorted);
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return <Loading />
    }
    return (
        <main>
            <h1>Latest collections</h1>
            <Board type="collection" items={collections} />
        </main>
    );
}

export default Explore;