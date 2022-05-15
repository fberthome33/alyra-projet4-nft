import React from "react";
import { Link } from "react-router-dom";
import truncateEthAddress from 'truncate-eth-address';

const Card = (props) => {
    
    const item = props.item;
    let path = "/collection/" + item.address;
    if(props.type === 'asset'){
        path += "/" + item.tokenId;
    }

    const bgurl = () => {
        return 'https://ipfs.moralis.io:2053/ipfs/' + item.tokenURI;
    }

    const description = () => {
        if (props.type === 'collection') {
            let creatorPath = '/user/'+item.creator+'/collections';
            return(
                <>
                <b>{item.name}</b> ({item.assets.length} NTF)
                <br />
                created by <Link to={creatorPath}>{truncateEthAddress(item.creator)}</Link>
                </>
            )
        }
        else {
            return (
                <>
                    <b>NFT {truncateEthAddress(item.address)} #{item.tokenId}</b>
                </>
            )
        }
    }

    return (
        <div className="card animate__animated animate__fadeIn">
            <Link to={path}>
                <div className="illustration" style={{ backgroundImage: `url(${bgurl()})` }}></div>
            </Link>
            <div className="title">
                {description()}
            </div>
        </div>
    );
}

export default Card;