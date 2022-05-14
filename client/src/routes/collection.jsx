import React, {useState, useEffect} from "react";
import { useParams, useOutletContext } from "react-router-dom";
import truncateEthAddress from 'truncate-eth-address';
import Board from "../components/board";
import Error from "./error";
import Loading from "./loading";

import useGetCollectionDetails from "../hooks/getcollectiondetails";

const Collection = () => {

    const [user, web3, contracts] = useOutletContext();    
    const { address } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState();
    const [assets, setAssets] = useState([]);
    
    const collectionDetails = useGetCollectionDetails(web3);
    
    useEffect(async() => {
        let res = await collectionDetails(address);
        setName(res.name);
        setLoaded(true);
    }, []);

    if (!web3.utils.isAddress(address)) {
        return <Error message="Requested collection not found..." />;
    }
    if (!loaded) {
        return <Loading />;
    }
    return (
        <main>
            <h1>
                Collection: {name}
            </h1>
            <Board type="asset" items={assets} />
        </main>
    );
}

export default Collection;