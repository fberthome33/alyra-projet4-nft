import React from "react";
import { useOutletContext } from "react-router-dom";
import useCreateAsset from "../hooks/createasset";
import Forbidden from "../routes/forbidden";

const NewAsset = () => {
    const [user, web3, contracts] = useOutletContext();    
    const createAsset = useCreateAsset(contracts.nftFactory, user.get('ethAddress'));
    /*
    const run = async (e) => {
        e.preventDefault();
        console.log('running');
        let res = await createAsset();
        console.log('done');
    }
    */
    if (!user) {
        return <Forbidden />
    }
    return (
        <main>
            <h1>
                Create new asset
            </h1>
        </main>
    );
}

export default NewAsset;