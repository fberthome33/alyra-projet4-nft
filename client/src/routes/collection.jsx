import React, {useState} from "react";
import { useParams, useOutletContext } from "react-router-dom";
import truncateEthAddress from 'truncate-eth-address';
import Board from "../components/board";
import Error from "./error";

import useGetCollectionDetails from "../hooks/getcollectiondetails";

const Collection = () => {

    const [user, web3, contracts] = useOutletContext();    
    const { address } = useParams();
    const [tokenURI, setTokenURI] = useState();

    const collectionDetails = useGetCollectionDetails(contracts.nftCollectionFactory);
    let res = collectionDetails(address);
    console.log(res);

    let assets = [];

    if (!web3.utils.isAddress(address)) {
        return <Error message="Requested collection not found..." />;
    }
    return (
        <main>
            <h1>
                Collection: {truncateEthAddress(address)}
            </h1>
            <img src={tokenURI}></img>
            <Board type="asset" items={assets} />
        </main>
    );
}

export default Collection;