const Web3 = require("web3");
const web3 = new Web3("https://arb-mainnet.g.alchemy.com/v2/M1zs5RAnVhg8QcaQ9TU4Bzi2H_him1HE");

const abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_shares",
                "type": "uint256"
            }
        ],
        "name": "convertToAssets",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const ETH_VAULT_ADDRESS = "0x2C2082E4062bFD02141aDC86cBd5E437201A1cf3";
const SENDER            = "0x000000000000000000000000000000000000dEaD";
const ethVaultInstance = new web3.eth.Contract(abi, ETH_VAULT_ADDRESS);

module.exports = { ethVaultInstance };
