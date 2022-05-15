import contractNftCollection from "../contracts/NftCollection.json";
import useFetchAssets from "../hooks/fetchassets";

const useGetCollectionDetails = (web3) => {
    const fetchAssets = useFetchAssets();
    return async (address) => {
        try {
            let contract = new web3.eth.Contract(contractNftCollection.abi, address);
            let collectionName = await contract.methods.name().call();
            //let tokenURI = await contract.methods.tokenURI().call();
            let assets = await fetchAssets(contract);
            let details = {
                address: address,
                name: collectionName,
             //   tokenURI: tokenURI,
                assets: assets
            }
            console.log(details);
            return details;
        } catch (error) {
            console.log(error);
        }
    }
};

export default useGetCollectionDetails;