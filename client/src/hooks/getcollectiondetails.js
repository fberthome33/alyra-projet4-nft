import contractNftCollection from "../contracts/NftCollection.json";
import useFetchAssetsByCollection from "./fetchassetsbycollection";
import useFetchCollections from "./fetchcollections";

const useGetCollectionDetails = (web3, factory) => {
    const fetchAssetsByCollection = useFetchAssetsByCollection();
    const fetchCollections = useFetchCollections(factory);
    return async (address) => {
        try {
            let nftCollection = new web3.eth.Contract(contractNftCollection.abi, address);
            let name = await nftCollection.methods.name().call();
            let filter = {
                _collectionAddress: address
            }
            let coll = await fetchCollections(filter);
            let assets = await fetchAssetsByCollection(nftCollection);
           // let assetsNbr = await fetchAssetsByCollection(nftCollection);
            let res = {
                address: address,
                creator: coll[0].creator,
                timestamp: coll[0].timestamp,
                name: name,
                tokenURI: coll[0].tokenURI,
                assets: assets,
             //   assetsNbr: 
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    }
};

export default useGetCollectionDetails;