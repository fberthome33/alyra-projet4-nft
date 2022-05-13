const useFetchCollections = (contract) => {
    return async (user = null) => {
        const res = await contract.getPastEvents('NftCollectionCreated', {
            fromBlock: 0,
            toBlock: 'latest'
        });
        let collections = [];
        for (const collection of res) {
            collections.push(collection);
        }
        return collections;
    }
}

export default useFetchCollections;