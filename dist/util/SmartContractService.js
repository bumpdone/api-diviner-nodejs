"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
const truffle_hdwallet_provider_1 = __importDefault(require("truffle-hdwallet-provider"));
const dotenv_1 = __importDefault(require("dotenv"));
const web3_1 = __importDefault(require("web3"));
const IPFSReader_1 = require("./IPFSReader");
dotenv_1.default.config();
let web3;
const mstring = process.env.MSTRING || '';
const infuraKey = process.env.INFURA_API_KEY;
let currentUser = process.env.WALLET;
let currentNetwork;
let smartContracts;
const getCurrentNetwork = () => {
    return currentNetwork;
};
const getSmartContracts = () => smartContracts;
const getCurrentConfigStore = () => web3
    ? web3.currentProvider
        ? web3.currentProvider.publicConfigStore
        : undefined
    : undefined;
const getNetworksString = (networks) => {
    let networkString = '';
    let iterator = 0;
    Object.entries(networks).forEach((net) => {
        networkString += getNetworkString(iterator, net[0]);
        iterator++;
    });
    return networkString;
};
const getNetworkString = (iterator, netId) => {
    const addComma = (iterator2, word2) => (iterator2 > 0 ? `, ${word2}` : word2);
    let word = 'localhost';
    switch (netId) {
        case '1':
            word = 'mainnet';
            break;
        case '3':
            word = 'roptsten';
            break;
        case '4':
            word = 'rinkeby';
            break;
        case '42':
            word = 'kovan';
            break;
        case '5777':
            word = 'localhost';
            break;
    }
    return addComma(iterator, word);
};
const contractObject = (name) => smartContracts.find((contract) => contract.name === name);
exports.contractNamed = (name) => {
    const contractObj = contractObject(name);
    return contractObj ? contractObj.contract : undefined;
};
const contractAddress = (name) => {
    const contractObj = contractObject(name);
    return contractObj ? contractObj.address : undefined;
};
exports.validateContracts = () => __awaiter(this, void 0, void 0, function* () {
    return Promise.all(smartContracts.map((contract) => validContract(contract.name))).then((results) => {
        if (results.length === 0) {
            throw new Error('No contracts found on this network');
        }
        else {
            return results.reduce((result, next) => result && next);
        }
    });
});
const validContract = (name) => __awaiter(this, void 0, void 0, function* () {
    const address = contractAddress(name);
    return new Promise((resolve, reject) => {
        web3.eth
            .getCode(address)
            .then((code) => code === '0x0' || code === '0x' ? resolve(false) : resolve(true))
            .catch((err) => reject(err));
    });
});
exports.getCurrentUser = () => currentUser;
exports.refreshContracts = (netId, ipfsHash) => __awaiter(this, void 0, void 0, function* () {
    console.log('Refreshing contracts');
    return IPFSReader_1.downloadFiles(ipfsHash)
        .then((contracts) => {
        currentNetwork = 'kovan'; // getNetworkString(0, String(netId))
        const sc = [];
        contracts.forEach((contract) => {
            const json = contract.data;
            if (json && json.networks[netId]) {
                console.log('Adding Contract', json.contractName, json.networks[netId]);
                const address = json.networks[netId].address;
                const contract2 = new web3.eth.Contract(json.abi, address);
                sc.push({
                    name: json.contractName,
                    contract: contract2,
                    address,
                    networks: json.networks,
                });
            }
            else if (Object.entries(json.networks).length > 0) {
                console.log('You are on the wrong network', web3.currentProvider.network, Object.entries(json.networks)[0]);
                throw new Error('Wrong Network Detected');
            }
        });
        smartContracts = sc;
        return sc;
    })
        .catch((err) => {
        console.log('Caught here', err);
        // throw new Error('Could not refresh', err)
    });
});
const getWeb3 = (netId) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (netId !== '5777') {
            const networkString = `https://kovan.infura.io/v3/${infuraKey}`;
            return new web3_1.default(new truffle_hdwallet_provider_1.default(mstring, networkString));
            /*
                   return new Web3(
              new Web3.providers.HttpProvider(
                networkString
              ),
              )
            */
        }
        const provider = new truffle_hdwallet_provider_1.default(mstring, 'http://localhost:8545');
        return new web3_1.default(provider);
    }
    catch (ex) {
        console.log(`getWeb3 Excepted: ${ex}`);
    }
});
const refreshUser = () => __awaiter(this, void 0, void 0, function* () {
    console.log('Trying to refresh User...');
    const accounts = web3.eth.getAccounts();
    console.log(`Updating USER from ${currentUser} to ${accounts[0]}`);
    currentUser = accounts[0];
    return accounts[0];
});
// reloadWeb3 = async (netId, ipfsHash) => {
//   web3 = getWeb3(netId)
//   return refreshContracts(netId, ipfsHash)
// }
exports.reloadWeb3 = (network, ipfsHash) => __awaiter(this, void 0, void 0, function* () {
    console.log(`reloadWeb3: ${network}, ${ipfsHash}`);
    web3 = yield getWeb3(network);
    yield exports.refreshContracts(network, ipfsHash);
    console.log('DONE!!!!!');
    /*await refreshUser()
    console.log('DONER!!!!!')*/
});
module.exports = {
    refreshContracts: exports.refreshContracts,
    reloadWeb3: exports.reloadWeb3,
    validateContracts: exports.validateContracts,
    contractNamed: exports.contractNamed,
    getCurrentUser: exports.getCurrentUser
};
//# sourceMappingURL=SmartContractService.js.map