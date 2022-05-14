import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import contractNftCollectionFactory from "./contracts/NftCollectionFactory.json";
import contractNftCollection from "./contracts/NftCollection.json";
//import contractNftFactory from "./contracts/NftFactory.json";
import getWeb3 from "./getWeb3";
import Moralis from "moralis";

import Main from "./routes/main";
import Home from "./routes/home";
import Assets from "./routes/assets";
import User from "./routes/user";
import Collection from "./routes/collection";
import NewCollection from "./routes/newcollection";
import Asset from "./routes/asset";
import NewAsset from "./routes/newasset";
import Explore from "./routes/explore";
import Notfound from "./routes/notfound";
import Loading from "./routes/loading";
import Collections from "./routes/collections";

import "animate.css";
import "./App.css";

require('dotenv').config({ path: __dirname + '/./../../.env' });

class App extends Component {

    state = {
        web3: null,
        accounts: null,
        contracts: null,
        user: null,
        loaded: false
    };

    runInit = async () => {
        await this.initUser();
        this.setState({ loaded: true });
    };

    initUser = async () => {
        let user = Moralis.User.current();
        this.setState({ user });
    }

    authenticate = async () => {
        if (Moralis.User.current()) {
            await Moralis.User.logOut();
        } else {
            await Moralis.authenticate({ signingMessage: "Connect your wallet" });
        }
        this.initUser();
    }

    componentDidMount = async () => {
        try {
            
            await Moralis.start({
                serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL,
                appId: process.env.REACT_APP_MORALIS_APPLICATION_ID,
                masterKey: process.env.REACT_APP_MORALIS_SECRET
            });

            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            // Get the contracts instances.
            const networkId = await web3.eth.net.getId();
            // Get Collection Factory instance.
            const nftCollectionFactoryNetwork = contractNftCollectionFactory.networks[networkId];
            const nftCollectionFactory = new web3.eth.Contract(
                contractNftCollectionFactory.abi,
                nftCollectionFactoryNetwork && nftCollectionFactoryNetwork.address,
            );
            // Get Collection instance.
            const nftCollectionNetwork = contractNftCollection.networks[networkId];
            const nftCollection = new web3.eth.Contract(
                contractNftCollection.abi,
                nftCollectionNetwork && nftCollectionNetwork.address,
            );

            /* const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            */
            
            const contracts = {
                nftCollectionFactory: nftCollectionFactory,
                nftCollection: nftCollection
            }

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, contracts }, this.runInit);
            
            // Watch accounts
            window.ethereum.on('accountsChanged', (accounts) => {
                this.setState({ accounts });                
                this.initUser();
                this.render();
            });
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        if(!this.state.loaded){
            return <Loading />;
        }
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main state={this.state} authenticate={this.authenticate} />}>
                        <Route index element={<Home />} />
                        <Route path="asset/:address" element={<Asset />} />
                        <Route path="asset/new" element={<NewAsset />} />
                        <Route path="collection/:address" element={<Collection />} />
                        <Route path="collection/new" element={<NewCollection />} />
                        <Route path="explore" element={<Explore />} />
                        <Route path="profile/assets" element={<Assets />} />
                        <Route path="profile/collections" element={<Collections />} />
                        <Route path="user/:address" element={<User />} />
                        <Route path="*" element={<Notfound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
