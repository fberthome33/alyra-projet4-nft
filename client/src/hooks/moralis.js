const Moralis = require('moralis');

const useMoralisPushIPFS = () => {
    return async (image) => {
        const file = new Moralis.File(image.name, image);
        await file.saveIPFS();
        return file;
        //console.log(file.ipfs(), file.hash())

        /*
        // Save file reference to Moralis
        const jobApplication = new Moralis.Object("Applications");
        jobApplication.set("name", "Satoshi");
        jobApplication.set("resume", file);
        await jobApplication.save();
        
        
        // Retrieve file
        const query = new Moralis.Query("Applications");
        query.equalTo("name", "Satoshi");
        query.find().then(function ([application]) {
            const ipfs = application.get("resume").ipfs();
            const hash = application.get("resume").hash();
            console.log("IPFS url", ipfs);
            console.log("IPFS hash", hash);
        });
        */
    }
}

export default useMoralisPushIPFS;