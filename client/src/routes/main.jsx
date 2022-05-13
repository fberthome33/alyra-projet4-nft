import React from "react";
import { Outlet, Link } from "react-router-dom";
import Authentication from '../components/authentication';

const Main = (props) => {
    
    const user = props.state.user;
    const web3 = props.state.web3;
    const contracts = props.state.contracts;
    const authenticate = props.authenticate;
    
    return (
        <div>
            <header>
                <Link to="/">AppName</Link>
                <Authentication user={user} authenticate={authenticate} />
            </header>
            <Outlet context={[user, web3, contracts]} />
            <footer>
                AppName
            </footer>
        </div>
    )
}

export default Main;