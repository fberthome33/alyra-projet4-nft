import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Board from "../components/board";
import Loading from "../routes/loading";
import Forbidden from "../routes/forbidden";
import useFetchAssets from "../hooks/fetchassets";

const Assets = () => {
    
    const [user, web3, contracts] = useOutletContext();
    const fetchAssets = useFetchAssets();
    const [loaded, setLoaded] = useState(false);
    const [assets, setAssets] = useState([]);
    
    useEffect(()=>{
        fetchAssets(user).then((res) => {
            let fetched = [];
            for (const asset of res) {
                fetched.push(asset);
            }
            setAssets(fetched);
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
                My assets
            </h1>
            <Board type="asset" items={assets} />
        </main>
    );
}

export default Assets;