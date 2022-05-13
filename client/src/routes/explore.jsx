import React from "react";
import { useOutletContext } from "react-router-dom";

const Explore = () => {
    const [user, web3, contracts] = useOutletContext();    
    return (
        <main>
            <h1>
                Explore
            </h1>
        </main>
    );
}

export default Explore;