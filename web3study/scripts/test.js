require('dotenv').config({ path: '../.env'});

const{API_URL,PRIVATE_KEY} = process.env
process.env.API_URL;

console.log(API_URL);

console.log([`0x${PRIVATE_KEY}`])