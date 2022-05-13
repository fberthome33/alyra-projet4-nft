import React, {useState} from "react";
import { Outlet, Link } from "react-router-dom";
import truncateEthAddress from 'truncate-eth-address';
//import Loading from "./loading";

const Main = (props) => {
    
    const user = props.state.user;
    const web3 = props.state.web3;
    const contracts = props.state.contracts;
    const [showNav, setShowNav] = useState(false);
    
   /* if (!props.state.loaded) {
        return <Loading />;
    }*/
    return (
        <div>
            <header>
                <Link to="/" onClick={() => setShowNav(false)}>AppName</Link>
                <nav>
                    <div id="userAddress">logged in: {truncateEthAddress(user.address)}</div>
                    <button className="toggleNav" onClick={() => setShowNav(!showNav)}></button>
                    {showNav &&
                        <ul className="animate__animated animate__fadeIn animate__faster">
                            <li><Link to="/profile/assets" onClick={() => setShowNav(false)}>my assets</Link></li>
                            <li><Link to="/profile/collections" onClick={() => setShowNav(false)}>my collections</Link></li>
                            <li><Link to="/collection/new" onClick={() => setShowNav(false)}>create new collection</Link></li>
                            <li><Link to="/asset/new" onClick={() => setShowNav(false)}>create new asset</Link></li>
                            <li><Link to="/explore" onClick={() => setShowNav(false)}>explore</Link></li>
                        </ul>
                    }
                </nav>
            </header>
            <Outlet context={[user, web3, contracts]} />
            <footer>
                AppName
            </footer>
        </div>
    )
}

export default Main;