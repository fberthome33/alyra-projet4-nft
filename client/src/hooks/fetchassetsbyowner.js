import contractNftCollection from "../contracts/NftCollection.json";

const useFetchAssetsByOwner = (web3, factory) => {
    return async (user, addressCollection) => {
        let nftCollection = new web3.eth.Contract(contractNftCollection.abi, addressCollection);
        const tokenCount = await nftCollection.methods.balanceOf(user).call();
        let assets = [];
        for (let index = 0; index < tokenCount; index++) {
            const tokenId = await nftCollection.methods.tokenOfOwnerByIndex(user, index).call();
            const tokenURI= await nftCollection.methods.tokenURI(tokenId).call();
            let token = {
                address: addressCollection,
                tokenId: tokenId,
                tokenURI: tokenURI
            }
            assets.push(token);
        }
        return assets;
    }
}

export default useFetchAssetsByOwner;