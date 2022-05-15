import contractNftCollection from "../contracts/NftCollection.json";

const useFetchAssetsByOwner = (web3, factory) => {
    return async (user, addressCollection) => {
        let nftCollection = new web3.eth.Contract(contractNftCollection.abi, address);
        const tokenCount = await nftCollection.methods.balanceOf(user);
        let assets = [];
        for (const index = 0; index < tokenCount; i++) {
            const tokenId = await nftCollection.methods.tokenOfOwnerByIndex(user, index);
            assets.push(tokenId);
        }
        return assets;
    }
}

export default useFetchAssetsByOwner;