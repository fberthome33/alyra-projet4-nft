// dotenv not working
// require('dotenv').config();
// const pinataKey = process.env.PINATA_KEY;
// console.log(pinataKey);
// const pinataSecret = process.env.PINATA_SECRET;
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('ed593bc6fa1b107c96ec', '17a5fe72d40c6f6ccceaa9d05663ce3c6201fcc3d871a3244442c6253f64f199');
//const fs = require('fs');
//const { Readable } = require('stream');
const fs = require('fs');

const usePinataPush = () => {

    return async (image) => {

       // console.log('pushing file to IPFS');
       // console.log(image);
        
        

        let res = await pinata.testAuthentication();
        console.log('authentication: '+res);

        let stream = fs.createReadStream('./src/service/server.jpg');

        const options = {
            pinataMetadata: {
                name: "AlyraNFT",
            },
            pinataOptions: {
                cidVersion: 0
            }
        };

        pinata.pinFileToIPFS(stream, options).then((result) => {
            const body = {
                description: "Un NFT tres beau pour alyra.",
                image: result.IpfsHash,
                name: "BestNFT",
            };

            pinata.pinJSONToIPFS(body, options).then((json) => {
                console.log(json);
            }).catch((err) => {
                console.log(err);
            });

        }).catch((err) => {
            console.log(err);
        });
        console.log('done');
    }
}

export default usePinataPush;