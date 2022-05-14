const useFetchAssets = () => {
    return async (contract) => {
        const res = await contract.getPastEvents('NftAddedToCollection');
        let assets = [];
        for (const item of res) {
            let asset = {
                address: item.returnValues._nftAddress
            }
            console.log(asset);
            assets.push(asset);
        }
        return assets;
    }
}

export default useFetchAssets;