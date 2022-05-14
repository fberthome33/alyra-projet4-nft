const useCreateAsset = (contract, user) => {
    let address = null;
    if(user){
        address = user.get('ethAddress');
    }
    return async () => {
        console.log(contract);
        console.log(address);
        console.log('creating asset');
    }
}

export default useCreateAsset;