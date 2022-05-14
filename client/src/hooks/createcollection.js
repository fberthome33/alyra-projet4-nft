const useCreateCollection = (contract, user) => {
    let address = null;
    if (user) {
        address = user.get('ethAddress');
    }
    return async (name, tokenURI) => {
        try {
            console.log(name);
            console.log(tokenURI);
            let res = await contract.methods.createNFTCollection(name, tokenURI).send({ from: address });
            return res.events.NftCollectionCreated.returnValues._collectionAddress;
        } catch (error) {
            console.log(error);
        }
    }
};

export default useCreateCollection;