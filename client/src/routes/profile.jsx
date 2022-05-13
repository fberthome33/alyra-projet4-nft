import React from "react";
import truncateEthAddress from 'truncate-eth-address';
import { useOutletContext } from "react-router-dom";
import Board from "../components/board";

const Profile = () => {
    const [user, web3, contracts] = useOutletContext();    
    /*
    const assets = [
        {
            address: '0xad92d062761dE59930eCb340B5443529067356D9',
            title: 'NFT1'
        },
        {
            address: '0x54654654621321313216466564',
            title: 'NFT2'
        },
        {
            address: '0x54654654654646656400000',
            title: 'NFT3'
        },
        {
            address: '0x5999994654654654646656400000',
            title: 'NFT4'
        }
    ];
*/
    return (
        <main>
            <h1>
                Profile
            </h1>
        </main>
    );
}

export default Profile;