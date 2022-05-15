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
    const getCollectionDetails = useGetCollectionDetails(web3);
    const [loaded, setLoaded] = useState(false);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        fetchCollections().then(async (res) => {
            // DOT BE DONE
            // ORDER COLLECTION BY TIMESTAMP DESC
            let fetched = [];
            for (const col of res) {
                console.log(col);
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
    }
    return (
        <main>
            <h1>Latest collections</h1>
            <Board type="collection" items={collections} />
        </main>
    );
}

export default Explore;