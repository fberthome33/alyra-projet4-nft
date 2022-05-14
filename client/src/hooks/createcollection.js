const useCreateCollection = (contract, address) => {
    return async (name, tokenURI) => {
        try {
            let res = await contract.methods.createNFTCollection(name, tokenURI).send({ from: address });
            return res.events.NftCollectionCreated.returnValues._collectionAddress;
        } catch (error) {
            console.log(error);
        }
    }
};

export default useCreateCollection;