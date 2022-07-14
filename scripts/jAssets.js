const axios =   require('axios').default;
const Twit  =   require('twit');
require("dotenv").config();


const ENDPOINT = `https://api.arbiscan.io/api`;
const API_KEY = process.env.ARBISCAN_API;

const slpAddressEthjEth = `0xDF1A6Dd4E5b77d7F2143eD73074bE26c806754c5`;
const slpAddressrDPXjRDPX = `0x110a0f39b15D04f2F348B61Bd741429C7d188d3F`;
const slpAddressDPXjDPX = `0xEeB24360C8C7A87933d16B0075E10E1a30Ad65B7`;
const slpAddressgOhmjgOhm = `0x292d1587a6Bb37E34574c9AD5993F221D8a5616C`;

const jEth = `0x662d0f9Ff837A51cF89A1FE7E0882a906dAC08a3`;
const wEth = `0x82aF49447D8a07e3bd95BD0d56f35241523fBab1`;

const jRDPX = `0x1f6Fa7A58701b3773b08a1a16D06b656B0eCcb23`;
const RDPX = `0x32Eb7902D4134bf98A28b963D26de779AF92A212`;

const jDPX = `0xF018865b26fFAb9cd1735DCca549D95b0CB9Ea19`;
const DPX = `0x6C2C06790b3E3E3c38e12Ee22F8183b37a13EE55`;

const jgOhm = `0x5375616bB6c52A90439fF96882a986d8FCdCe421`;
const gOhm = `0x8D9bA570D6cb60C7e3e0F31343Efe75AB8E65FB1`;

const den = 1000000000000000000;

const getReserves = async() => {
    
    let json = [];

    let jEthAmount = await axios.get(ENDPOINT + `?module=account&action=tokenbalance&contractaddress=${jEth}&address=${slpAddressEthjEth}&tag=latest&apikey=${API_KEY}`);
    let wEthAmount = await axios.get(ENDPOINT + `?module=account&action=tokenbalance&contractaddress=${wEth}&address=${slpAddressEthjEth}&tag=latest&apikey=${API_KEY}`);

    let jRDPXAmount = await axios.get(ENDPOINT + `?module=account&action=tokenbalance&contractaddress=${jRDPX}&address=${slpAddressrDPXjRDPX}&tag=latest&apikey=${API_KEY}`);
    let RDPXAmount = await axios.get(ENDPOINT + `?module=account&action=tokenbalance&contractaddress=${RDPX}&address=${slpAddressrDPXjRDPX}&tag=latest&apikey=${API_KEY}`);

    let jDPXAmount = await axios.get(ENDPOINT + `?module=account&action=tokenbalance&contractaddress=${jDPX}&address=${slpAddressDPXjDPX}&tag=latest&apikey=${API_KEY}`);
    let DPXAmount = await axios.get(ENDPOINT + `?module=account&action=tokenbalance&contractaddress=${DPX}&address=${slpAddressDPXjDPX}&tag=latest&apikey=${API_KEY}`);

    let jgOhmAmount = await axios.get(ENDPOINT + `?module=account&action=tokenbalance&contractaddress=${jgOhm}&address=${slpAddressgOhmjgOhm}&tag=latest&apikey=${API_KEY}`);
    let gOhmAmount = await axios.get(ENDPOINT + `?module=account&action=tokenbalance&contractaddress=${gOhm}&address=${slpAddressgOhmjgOhm}&tag=latest&apikey=${API_KEY}`);
    
    let pair = {
        token: 'wEth/jEth',
        ratio: await (wEthAmount.data.result / den) / (jEthAmount.data.result / den)
    };
    json.push(pair);

    pair = {
        token: 'RDPX/jRDPX',
        ratio: await (RDPXAmount.data.result / den) / (jRDPXAmount.data.result / den)
    };
    json.push(pair);

    pair = {
        token: 'DPX/jDPX',
        ratio: await (DPXAmount.data.result / den) / (jDPXAmount.data.result / den)
    };
    json.push(pair);

    pair = {
        token: 'gOhm/jgOhm',
        ratio: await (gOhmAmount.data.result / den) / (jgOhmAmount.data.result / den)
    };
    json.push(pair);

    return json;
}

const tweet = async() => {
    let prices = await getReserves();
    console.log(prices[0]);
    var T = new Twit({
        consumer_key: process.env.CK,
        consumer_secret: process.env.CK_S,
        access_token: process.env.AT,
        access_token_secret: process.env.AT_S
    });
    
    let body = {
        status: `
                Sushi Liquidity Pool ratios for jAssets: \n\n
                1 jEth = ${prices[0].ratio.toFixed(5)} wEth\n
                1 jRDPX = ${prices[1].ratio.toFixed(5)} RDPX\n
                1 jDPX = ${prices[2].ratio.toFixed(5)} DPX\n
                1 jgOhm = ${prices[3].ratio.toFixed(5)} gOhm\n\n\n
        𝒿𝑒𝑒𝓃𝒾𝓈
                `
    };
    
    console.log(body);
    
    try {
        T.post('statuses/update', body, function(err, data, response) {
            console.log(err);
        })
    } catch (err) {
        console.log(err);
    }
    
}

try {
    tweet();
} catch(error) {
    console.log(error);
}