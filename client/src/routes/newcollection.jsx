import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import useCreateCollection from "../hooks/createcollection";
//import usePinataPush from "../hooks/pinata";
import useUploadImage from "../hooks/uploadimage";
import Forbidden from "../routes/forbidden";
import useFetchCollections from "../hooks/fetchcollections";

const NewCollection = () => {

    const [user, web3, contracts] = useOutletContext();
    const navigate = useNavigate();
    const fetchCollections = useFetchCollections(contracts.nftCollectionFactory);
    const createCollection = useCreateCollection(contracts.nftCollectionFactory, user);
    //const pinataPush = usePinataPush();
    const uploadImage = useUploadImage();

    const [submitting, setSubmitting] = useState(false);
    const [availableName, setAvailableName] = useState(true);
    const [collectionName, setCollectionName] = useState(null);
    const [collectionNameRequired, setCollectionNameRequired] = useState(false);
    const [collectionImage, setCollectionImage] = useState(null);
    const [collectionImageRequired, setCollectionImageRequired] = useState(false);
    const [collectionImagePreview, setCollectionImagePreview] = useState();
    
    const handleName = () => {
        const name = document.querySelector('#collectionName').value;
        if(name){
            let filter = {
                _collectionName: name
            }
            fetchCollections(filter).then((res) => {
                if (res.length === 0) {
                    setCollectionName(name);
                    setAvailableName(true);
                } else {
                    setAvailableName(false);
                }
            });
        } else {
            setCollectionName(name);
            setAvailableName(true);
        }
        setCollectionNameRequired(false);
    }
    
    const nameRequired = () => {
        if (!availableName){
            return (
                <div className="required">
                    <span className="animate__animated animate__fadeIn">
                        this name is not available
                    </span>
                </div>
            );
        } else if (collectionNameRequired){
            return (
                <div className="required">
                    <span className="animate__animated animate__fadeIn">
                        the collection name is required
                    </span>
                </div>
            );
        }
    }
    
    const handleImage = () => {
        const file = document.querySelector('input[type=file]').files[0];
        setCollectionImage(file);
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            setCollectionImageRequired(false);
            setCollectionImagePreview(reader.result);
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const selectImage = () => {
        document.querySelector("#collectionImage").click();
    }

    const selectedImage = () => {
        if (collectionImagePreview){
            return <img id="imagePreview" src={collectionImagePreview} />
        }
        return <div id="imageSelector"></div>    
    }

    const imageRequired = () => {
        if (collectionImageRequired) {
            return (
                <div className="required">
                    <span className="animate__animated animate__fadeIn">
                        the collection illustration is required
                    </span>
                </div>
            );
        }
    }

    const run = async (e) => {
        e.preventDefault();
        if (!collectionName || !collectionImage) {
            if (!collectionName){
                setCollectionNameRequired(true);
            }
            if (!collectionImage) {
                setCollectionImageRequired(true);
            }
        }
        else {
            setSubmitting(true);
            console.log('running');
            /*let tokenURI = '';
            if(collectionImage){
                let image = await uploadImage(collectionImage);
                tokenURI += image.hash();
            }*/
            let image = await uploadImage(collectionImage);
            let tokenURI = image.hash();
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
            <form className="createNew" autocomplete="off">
                <fieldset>
                    <label>
                        Name (required)
                    </label>
                    <input type="text" id="collectionName" onBlur={handleName} />
                    {nameRequired()}
                </fieldset>
                <fieldset>
                    <label>
                        Illustration (required)
                    </label>
                    <input type="file" id="collectionImage" onChange={handleImage} />                    
                    <div onClick={selectImage}>
                        {selectedImage()}
                    </div>
                    {imageRequired()}
                </fieldset>
                <fieldset>
                    <input type="submit" value="create" onClick={run} disabled={submitting} />                     
                </fieldset>
            </form>            
        </main>
    );
}

export default NewCollection;