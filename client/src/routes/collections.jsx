import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Board from "../components/board";
import Loading from "../routes/loading";
import Forbidden from "../routes/forbidden";
import useFetchCollections from "../hooks/fetchcollections";

const Collections = () => {

    const [user, web3, contracts] = useOutletContext();
    const fetchCollections = useFetchCollections(contracts.nftCollectionFactory);
    const [loaded, setLoaded] = useState(false);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        fetchCollections(user).then((res) => {
            let fetched = [];
            for (const asset of res) {
                fetched.push(asset);
            }
            setCollections(fetched);
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return <Loading />
    }
    if (!user) {
        return <Forbidden />
    }
    return (
        <main>
            <h1>
                My collections
            </h1>
            <Board type="collection" items={collections} />
        </main>
    );
}

export default Collections;