const abiJSON = require('./abi.json');
const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();

// Java Script Object to store the contract adress of rinkeby network and mumbai network
const contractAdress = {
    rinkeby: '0xAcA7E53c64739648e7f464B8f45a18947142D4B2',
    mumbai: '0xF1701675da6851267680e9f957152de47FD59b07'
}

// Javascript object to store the providerOrUrl for different networks
const providerOrUrl = {
    rinkeby: process.env.RINKEBY,
    mumbai: process.env.MUMBAI
}

/**
 * 
 * @param {string} cid 
 * @param {string} filename 
 * @param {string} type
 * @param {string} recieversAddress
 * 
 * @return {Promise<void>}
 * 
 * @description This function will call the smart contract to mint non trasferable certificates to customer's account
 * 
 */
async function callContract(cid, filename, type, recieversAddress) {
    let provider = new HDWalletProvider({
        privateKeys: [process.env.PRIVATE_KEY],
        providerOrUrl: providerOrUrl[type]
    });
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();

    const contract = new web3.eth.Contract(abiJSON.abi, contractAdress[type]);
    await contract.methods.mint(recieversAddress, `ipfs://${cid}/${filename}.json`).send({
        from: accounts[0],
    });

    provider.engine.stop();
}

module.exports = {
    callContract: callContract
}