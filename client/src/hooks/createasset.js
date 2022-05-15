import contractNftCollection from "../contracts/NftCollection.json";

const useCreateAsset = (user, web3) => {
    let address = null;
    if (user) {
        address = user.get('ethAddress');
    }
    return async (collection, tokenURI, price) => {
        try {
            let nftCollection = new web3.eth.Contract(contractNftCollection.abi, collection.address);
            let res = await nftCollection.methods.mintCollection(tokenURI, price).send({ from: address });
            const eventValues = res.events.NewTokenMinted.returnValues;
            return {
                address: eventValues._collectionAddress, 
                tokenId: eventValues._tokenId};
        } catch (error) {
            console.log(error);
        }
    }
}

export default useCreateAsset;