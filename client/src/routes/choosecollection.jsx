import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Board from "../components/board";
import Loading from "../routes/loading";
import Forbidden from "../routes/forbidden";
import useFetchCollections from "../hooks/fetchcollections";
import useGetCollectionDetails from "../hooks/getcollectiondetails";

const Collections = () => {

    const [user, web3, contracts] = useOutletContext();
    const fetchCollections = useFetchCollections(contracts.nftCollectionFactory);
    const getCollectionDetails = useGetCollectionDetails(web3, contracts.nftCollectionFactory);
    const [loaded, setLoaded] = useState(false);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        let customFilter = {
            _creator: user.get('ethAddress')
        }
        fetchCollections(customFilter).then(async (res) => {
            let fetched = [];
            for (const col of res) {
                console.log(col);
                let collection = await getCollectionDetails(col.address);
                collection.creator = col.creator;
                fetched.push(collection);
            }
            setCollections(fetched);
            setLoaded(true);
        });
    }, []);

    const navigate = useNavigate();
    
    if (!loaded) {
        return <Loading />
    }
    if (!user) {
        return <Forbidden />
    }
    return (
        <main>
            <h1>
                create a new collection
            </h1>
            <form className="createNew">
                <button onClick={() => { navigate('/collection/new'); }}>
                    create
                </button>
            </form>
            {collections.length > 0 &&
                <>
                <h1>
                    or select an existing collection
                </h1>
                <Board type="collection" items={collections} />
                </>
            }
        </main>
    );
}

export default Collections;