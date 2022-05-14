const useFetchCollections = (contract) => {
    return async (address = null) => {
        console.log(address);
        let customFilter = {};
        if(address){
            customFilter = { '_creator': 'fsdfbsdf' };
        }
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
            }
            collections.push(collection);
        }
        return collections;
    }
}

export default useFetchCollections;