import React, { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import useCreateAsset from "../hooks/createasset";
import Forbidden from "../routes/forbidden";
import Loading from "../routes/loading";
import Error from "../routes/error";
import useGetCollectionDetails from "../hooks/getcollectiondetails";
import useUploadImage from "../hooks/uploadimage";

const NewAsset = () => {
    
    const [user, web3, contracts] = useOutletContext();    
    const createAsset = useCreateAsset(user, web3);
    const [submitting, setSubmitting] = useState(false);
    const [collection, setCollection] = useState();
    const [assetImage, setAssetImage] = useState(null);
    const [assetImageRequired, setAssetImageRequired] = useState(false);
    const [assetImagePreview, setAssetImagePreview] = useState();
    const [loaded, setLoaded] = useState(false);
    const getCollectionDetails = useGetCollectionDetails(web3, contracts.nftCollectionFactory);
    const { address } = useParams();
    const uploadImage = useUploadImage();
    const navigate = useNavigate();

    useEffect(async () => {
        let collection = await getCollectionDetails(address);
        console.log(collection);
        setCollection(collection);
        setLoaded(true);
    }, []);


    const handleImage = () => {
        const file = document.querySelector('input[type=file]').files[0];
        setAssetImage(file);
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            setAssetImageRequired(false);
            setAssetImagePreview(reader.result);
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const selectImage = () => {
        document.querySelector("#assetImage").click();
    }

    const selectedImage = () => {
        if (assetImagePreview) {
            return <img id="imagePreview" src={assetImagePreview} />
        }
        return <div id="imageSelector"></div>
    }

    const imageRequired = () => {
        if (assetImageRequired) {
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
        let price = document.querySelector("#itemPrice").value;
        if (!assetImage) {
            setAssetImageRequired(true);
        }
        else {
            setSubmitting(true);
            let image = await uploadImage(assetImage);
            let tokenURI = image.hash();
            let createdAssetRes = await createAsset(collection, tokenURI, price);
            if (address) {
                navigate('/collection/' + createdAssetRes.address + '/' + createdAssetRes.tokenId);
            } else {
                setSubmitting(false);
            }
        }
    }
    
    if (!user) {
        return <Forbidden />
    } else if (!loaded) {
        return <Loading />
    } else if (web3.utils.toChecksumAddress(collection.creator) != web3.utils.toChecksumAddress(user.get('ethAddress'))){
        return <Error message="You're not allowed to access this section" />
    }
    return (
        <main>
            <h1>
                Create new NFT
            </h1>
            <form className="createNew" autoComplete="off">
                <fieldset>
                    <label>
                        Collection
                    </label>
                    <input type="text" value={collection.name} id="collectionName" disabled />
                </fieldset>
                <fieldset>
                    <label>
                        Price
                    </label>
                    <input type="number" value="0" id="assetPrice" />
                </fieldset>
                <fieldset>
                    <label>
                        Illustration (required)
                    </label>
                    <input type="file" id="assetImage" onChange={handleImage} />
                    <div onClick={selectImage}>
                        {selectedImage()}
                    </div>
                    {imageRequired()}
                </fieldset>
                <fieldset>
                    <button onClick={(e) => { run(e) }} disabled={submitting}>
                        create NFT
                    </button>
                </fieldset>
            </form>
        </main>
    );
}

export default NewAsset;