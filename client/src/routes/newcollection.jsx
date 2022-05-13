import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
//import DragDrop from "../components/dragdrop";
//import { Formik, Form, Field, ErrorMessage } from "formik";
import useCreateCollection from "../hooks/createcollection";
import usePinataPush from "../hooks/pinata";

const NewCollection = () => {

    const [user, web3, contracts] = useOutletContext();
    const createCollection = useCreateCollection(contracts.nftCollectionFactory);
    const pinataPush = usePinataPush();

    const [collectionName, setCollectionName] = useState();
    const [collectionImage, setCollectionImage] = useState();
    
    const handleName = () => {
        const name = document.querySelector('#collectionName').value;
        setCollectionName(name);
    }
    
    const handleImage = () => {
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            setCollectionImage(reader.result);
        }, false);        
        if (file) {
            reader.readAsDataURL(file);
            //reader.readAsBinaryString(file);
        }
    }
    
    const run = async (e) => {
        e.preventDefault();
        if (collectionName && collectionImage){
            console.log('running');
            await pinataPush(collectionImage);
            await createCollection(collectionName);
            console.log('done');
        } else {
            console.log('collection name or image is empty');
            console.log(collectionName);
            console.log(collectionImage);
        }
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
                <br/>
                <br/>
                <img id="preview" src={collectionImage}></img>
                <br/>
                <br/>
                <input type="submit" value="create" onClick={run} /> 
            </form>            
        </main>
    );
}

export default NewCollection;