const useCreateAsset = (contract, address) => {
    return async () => {
        console.log(contract);
        console.log(address);
        console.log('creating asset');
    }
}

export default useCreateAsset;