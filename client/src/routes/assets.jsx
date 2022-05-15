import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Board from "../components/board";
import Loading from "../routes/loading";
import Forbidden from "../routes/forbidden";
import useFetchAssetsByOwner from "../hooks/fetchassetsbyowner";

const Assets = () => {
    
    const [user, web3, contracts] = useOutletContext();
    const fetchAssetsByOwner = useFetchAssetsByOwner();
    const fetchCollections = useFetchCollections(contracts.nftCollectionFactory);
    const [loaded, setLoaded] = useState(false);
    const [assets, setAssets] = useState([]);
    
    useEffect(()=>{
        let customFilter = {
        };
        fetchCollections(customFilter).then(async(res) => {
            let fetched = [];
            for (const col of res) {
                console.log(col);
                let tokenIds = await fetchAssetsByOwner(user.get('ethAddress'), col.address);
                tokenIds.forEach(tokenId => fetched.push(tokenId));
            }
            setAssets(fetched);
            setLoaded(true);
        });

        for (const item of res) {

        }
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