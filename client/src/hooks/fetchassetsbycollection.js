const useFetchAssetsByCollection = () => {
    return async (contract) => {
        const res = await contract.getPastEvents('NewTokenMinted', {
            fromBlock: 0,
            toBlock: 'latest'
        });
        console.log(res);
        let assets = [];
        for (const item of res) {
            let asset = {
                address: item.returnValues._collectionAddress,
                tokenId: item.returnValues._tokenId,
                tokenURI: await contract.methods.tokenURI(item.returnValues._tokenId).call()
            }
            console.log(asset);
            assets.push(asset);
        }
        return assets;
    }
}

export default useFetchAssetsByCollection;