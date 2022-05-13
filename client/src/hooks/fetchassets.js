const useFetchAssets = () => {
    return async (user) => {
        let assets = [
            {
                address: '0xad92d062761dE59930eCb340B5443529067356D9',
                title: 'NFT1'
            },
            {
                address: '0x54654654621321313216466564',
                title: 'NFT2'
            },
            {
                address: '0x54654654654646656400000',
                title: 'NFT3'
            },
            {
                address: '0x5999994654654654646656400000',
                title: 'NFT4'
            }
        ];
        console.log(assets);
        console.log('done');
        return assets;
    }
}

export default useFetchAssets;