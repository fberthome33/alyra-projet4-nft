import React from "react";
import { useOutletContext } from "react-router-dom";

const Home = () => {
    const [user, web3, contracts] = useOutletContext();
    return (
        <main>
            <h1>Home</h1>
        </main>
    );
}

export default Home;