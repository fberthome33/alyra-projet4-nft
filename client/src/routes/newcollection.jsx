import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import useCreateCollection from "../hooks/createcollection";
//import usePinataPush from "../hooks/pinata";
import useMoralisPushIPFS from "../hooks/moralis";
import Forbidden from "../routes/forbidden";

const NewCollection = () => {

    const [user, web3, contracts] = useOutletContext();
    const navigate = useNavigate();
    const createCollection = useCreateCollection(contracts.nftCollectionFactory, user.get('ethAddress'));
    //const pinataPush = usePinataPush();
    const moralisPushIPFS = useMoralisPushIPFS();

    const [submitting, setSubmitting] = useState(false);
    const [collectionName, setCollectionName] = useState();
    const [collectionNameRequired, setCollectionNameRequired] = useState(false);
    const [collectionImage, setCollectionImage] = useState();
    const [collectionImagePreview, setCollectionImagePreview] = useState();
    
    const handleName = () => {
        const name = document.querySelector('#collectionName').value;
        setCollectionName(name);
        if (!collectionName) {
            setCollectionNameRequired(true);
        }
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
        }
    }
    
    const run = async (e) => {
        e.preventDefault();
        if (!collectionName) {
            console.log('collectionNameRequired');
            setCollectionNameRequired(true);
        }
        else {
            setSubmitting(true);
            console.log('running');
            let tokenURI = '';
            if(collectionImage){
                let res = await moralisPushIPFS(collectionImage);
                tokenURI += res.hash();
            }
            try {
                let address = await createCollection(collectionName, tokenURI);                
                setSubmitting(false);
                navigate('/collection/' + address);
            } catch (error) {
                setSubmitting(false);
                console.log(error);
            }
            //await pinataPush(collectionImage);
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
                <label className={ collectionNameRequired ? "animate__animated animate__shakeX" : "" }>
                    Collection Name
                </label>
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
                <input type="submit" value="create" onClick={run} disabled={submitting} /> 
            </form>            
        </main>
    );
}

export default NewCollection;