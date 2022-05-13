import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import truncateEthAddress from 'truncate-eth-address';
import Error from "./error";

const User = () => {
    const [user, core, web3] = useOutletContext();
    const { address } = useParams(); 
    if (!web3.utils.isAddress(address)) {
        return <Error message="Requested user not found..." />;
    }
    return (
        <main>
            <h1>
                User: {truncateEthAddress(address)}
            </h1>
        </main>
    );
}

export default User;