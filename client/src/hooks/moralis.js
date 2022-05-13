const Moralis = require('moralis');

const useMoralisPushIPFS = () => {
    return async (image) => {

        /*
        await Moralis.start({
            serverUrl: 'https://cq13uh1noutd.usemoralis.com:2053/server',
            appId: 'M9cnbPzvEQOgc7cAHlOAV43hyK62TxKHZgGdIRP3',
            masterKey: 'YWsK3iOt3hKr16lP1tCWHN05FOXzq3YOHUhjhHGP'
        });
        await Moralis.authenticate();
        */
        
        // Save file input to IPFS
        const file = new Moralis.File(image.name, image);
        await file.saveIPFS({ useMasterKey: true });

        console.log(file.ipfs(), file.hash())

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