require('dotenv').config();
const key = process.env.PINATA_KEY;
const secret = process.env.PINATA_SECRET;

console.log('secret'  +secret);
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(key, secret);
const fs = require('fs');
const readableStreamForFile = fs.createReadStream('./src/service/server.jpg');

const options = {
    pinataMetadata: {
        name: "AlyraNFT",
    },
    pinataOptions: {
        cidVersion: 0
    }
};


pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
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
