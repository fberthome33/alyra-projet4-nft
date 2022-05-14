import contractNftCollection from "../contracts/NftCollection.json";
import useFetchAssets from "../hooks/fetchassets";

const useGetCollectionDetails = (web3) => {
    const fetchAssets = useFetchAssets();
    return async (address) => {
        try {
            let contract = new web3.eth.Contract(contractNftCollection.abi, address);
            let collectionName = await contract.methods.collectionName().call();
            let assets = fetchAssets(contract);
            let details = {
                name: collectionName,
                assets: assets
            }
            return details;
        } catch (error) {
            console.log(error);
        }
    }
};

export default useGetCollectionDetails;