import React, { useState } from "react";
import { Link } from "react-router-dom";
import truncateEthAddress from 'truncate-eth-address';

const Authentication = (props) => {

    const user = props.user;
    const [showNav, setShowNav] = useState(false);
    const [authenticating, setAuthenticating] = useState(false);
    const authenticate = async () => {
        setAuthenticating(true);
        try {
            await props.authenticate();   
            setShowNav(!showNav);
            setAuthenticating(false) 
        } catch (error) {
            setAuthenticating(false);
        }
    };

    const userAdress = () => {
        if(user){
            return(
                <div id="userAddress" className="animate__animated animate__fadeIn">
                    connected: {truncateEthAddress(user.get('ethAddress'))}
                </div>
            )
        }
    }

    const navItems = () => {
        if (showNav){
            if(user){
                return (
                    <ul className="animate__animated animate__fadeIn animate__faster">
                        <li><Link to="/profile/assets" onClick={() => setShowNav(false)}>my assets</Link></li>
                        <li><Link to="/profile/collections" onClick={() => setShowNav(false)}>my collections</Link></li>
                        <li><Link to="/collection/new" onClick={() => setShowNav(false)}>create new collection</Link></li>
                        <li><Link to="/asset/new" onClick={() => setShowNav(false)}>create new asset</Link></li>
                        <li><Link to="/explore" onClick={() => setShowNav(false)}>explore</Link></li>
                        <li><button onClick={() => { authenticate() }} >LOGOUT</button></li>
                    </ul>
                )
            }
            return(
                <div id="connect" className="animate__animated animate__fadeIn animate__faster">
                    <button onClick={() => { authenticate() }} disabled={authenticating}>
                        connect my wallet
                    </button>
                </div>
            )
        }
    }

    return(
        <nav>
            {userAdress()}
            <button className="toggleNav" onClick={() => setShowNav(!showNav)}></button>
            {navItems()}
        </nav>
    );
}

export default Authentication;