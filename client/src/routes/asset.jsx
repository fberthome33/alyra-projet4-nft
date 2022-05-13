import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import truncateEthAddress from 'truncate-eth-address';
import Error from "./error";

const Asset = () => {
    
    const [user, web3, contracts] = useOutletContext();    
    const { address } = useParams();

    if (!web3.utils.isAddress(address)) {
        return <Error message="requested NFT not found..." />;
    }
    return (
        <main>
            <h1>
                NFT {truncateEthAddress(address)}
            </h1>
        </main>
    );
}

export default Asset;