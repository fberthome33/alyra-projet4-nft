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
    const [collection, setCollection] = useState();
    //const [assets, setAssets] = useState([]);
    
    const collectionDetails = useGetCollectionDetails(web3);

    useEffect(async() => {
        let collection = await collectionDetails(address);
        //console.log(collection);
        setCollection(collection);
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
                Collection: {collection.name}<br/>
            </h1>
            <p>
                details:
                {collection.creator}
            </p>
            <Board type="asset" items={collection.assets} />
        </main>
    );
}

export default Collection;