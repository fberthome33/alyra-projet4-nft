const useCreateCollection = (contract) => {
    return async (name) => {
        console.log('creating collection for');
        console.log('collection named ' + name);
        console.log(contract);
        // let res = await contract.methods
        console.log('done');
    }
};

export default useCreateCollection;