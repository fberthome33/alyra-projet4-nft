const useFetchCollections = (contract) => {
    return async (customFilter = {}) => {
        /*if (customFilter._collectionAddress){
            console.log(customFilter._collectionAddress);
        }*/
        console.log(customFilter);
        const res = await contract.getPastEvents('NftCollectionCreated', {
            filter: customFilter,
            fromBlock: 0,
            toBlock: 'latest'
        });
        let collections = [];
        for (const item of res) {
            let collection = {
                address: item.returnValues._collectionAddress,
                name: item.returnValues._collectionName,
                timestamp: item.returnValues._timestamp,
                creator: item.returnValues._creator,
                tokenURI: item.returnValues._tokenURI,
            }
            console.log(collection);
            collections.push(collection);
        }
        return collections;
    }
}

export default useFetchCollections;