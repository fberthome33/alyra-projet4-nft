import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import truncateEthAddress from 'truncate-eth-address';
import Board from "../components/board";
import Error from "./error";

const Collection = () => {
        
    const [user, web3, contracts] = useOutletContext();    
    const { address } = useParams();

    let assets = [
        {
            address: '0xad92d062761dE59930eCb340B5443529067356D9'
        },
        {
            address: '0xad92d062761dE59930eCb340B5443529067356D9'
        }
    ]

    if (!web3.utils.isAddress(address)) {
        return <Error message="Requested collection not found..." />;
    }
    return (
        <main>
            <h1>
                Collection: {truncateEthAddress(address)}
            </h1>
            <Board type="asset" items={assets} />
        </main>
    );
}

export default Collection;