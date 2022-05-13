import React from "react";
import { useOutletContext } from "react-router-dom";
import useCreateAsset from "../hooks/createasset";
import Forbidden from "../routes/forbidden";

const NewAsset = () => {
    const [user, web3, contracts] = useOutletContext();    
    const createAsset = useCreateAsset(user, contracts.nftFactory);
    
    const run = async (e) => {
        e.preventDefault();
        console.log('running');
        let res = await createAsset();
        console.log('done');
    }
    
    if (!user) {
        return <Forbidden />
    }
    return (
        <main>
            <h1>
                Create new asset
            </h1>
            <form>
                <input type="text" />
                <input type="file" />
                <input type="submit" value="envoyer" onClick={run} />
            </form>
        </main>
    );
}

export default NewAsset;