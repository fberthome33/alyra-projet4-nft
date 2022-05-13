import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import useCreateCollection from "../hooks/createcollection";
import usePinataPush from "../hooks/pinata";
import useMoralisPushIPFS from "../hooks/moralis";
import Forbidden from "../routes/forbidden";

const NewCollection = () => {

    const [user, web3, contracts] = useOutletContext();
    const createCollection = useCreateCollection(contracts.nftCollectionFactory);
    const pinataPush = usePinataPush();
    const moralisPushIPFS = useMoralisPushIPFS();

    const [collectionName, setCollectionName] = useState();
    const [collectionImage, setCollectionImage] = useState();
    const [collectionImagePreview, setCollectionImagePreview] = useState();
    
    const handleName = () => {
        const name = document.querySelector('#collectionName').value;
        setCollectionName(name);
    }
    
    const handleImage = () => {
        const file = document.querySelector('input[type=file]').files[0];
        setCollectionImage(file);
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            setCollectionImagePreview(reader.result);
        }, false);        
        if (file) {
            reader.readAsDataURL(file);
            //reader.readAsBinaryString(file);
        }
    }
    
    const run = async (e) => {
        e.preventDefault();
       // if (collectionName && collectionImage){
        if (collectionImage){
            console.log('running');
            await moralisPushIPFS(collectionImage);
            //await pinataPush(collectionImage);
            //await createCollection(collectionName);
            console.log('done');
        } else {
            console.log('collection name or image is empty');
            console.log(collectionName);
            console.log(collectionImage);
        }
    }

    if (!user) {
        return <Forbidden />
    }
    return (
        <main>
            <h1>
                Create new collection
            </h1>
            <form>
                Collection Name<br/>
                <input type="text" id="collectionName" onChange={handleName} />    
                <br/>
                <br/>
                Collection Illustration<br/>
                <input type="file" id="collectionImage" onChange={handleImage} />
                {collectionImagePreview &&
                    <>
                    <br/>
                    <br/>
                    <img id="preview" src={collectionImagePreview} />
                    </>
                }
                <br/>
                <br/>
                <input type="submit" value="create" onClick={run} /> 
            </form>            
        </main>
    );
}

export default NewCollection;