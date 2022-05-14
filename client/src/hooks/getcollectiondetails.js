const useGetCollectionDetails = (contract) => {
    return async (address) => {
        try {
            let tokenURI = await contract.methods.tokenURI(address).call();
            let details = {
                tokenURI: tokenURI
            }
            return details;
        } catch (error) {
            console.log(error);
        }
    }
};

export default useGetCollectionDetails;