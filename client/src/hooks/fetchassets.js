const useFetchAssets = () => {
    return async (contract) => {
        const res = await contract.getPastEvents('NewTokenMinted');
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