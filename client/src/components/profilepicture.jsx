import React from "react";

const ProfilePicture = (props) => {
    let uri = props.uri;
    let bgurl = 'https://ipfs.moralis.io:2053/ipfs/' + uri;
    return (
        <div className="profilePicture" style={{ backgroundImage: `url(${bgurl})` }}>
        </div>
    )
}

export default ProfilePicture;