const fs = require('fs');
const axios = require('axios');
const openpgp = require('openpgp');

const keys = [
    fs.readFileSync('./output/buyer_public.key', 'utf8'),
    fs.readFileSync('./output/seller_public.key', 'utf8')
];

(async () => {
    await openpgp.initWorker({path: 'openpgp.worker.js'}); // set the relative web worker path

    const hash = 'https://ipfs.infura.io/ipfs/QmXHqGGLgS6N7ZeX4MHQ5FwaWK576RrTbq7rghsr8bf2aB';

    const {data} = await axios.get(hash);

    /////////////////
    // BUYERS KEYS //
    /////////////////

    const publicBuyerKeyArmored = fs.readFileSync('./output/buyer_public.key', 'utf8');
    const privateBuyerKeyArmored = fs.readFileSync('./output/buyer_private.key', 'utf8');

    const {keys: [privateKey]} = await openpgp.key.readArmored(privateBuyerKeyArmored);

    const {data: decrypted} = await openpgp.decrypt({
        message: await openpgp.message.readArmored(data),              // parse armored message
        publicKeys: (await openpgp.key.readArmored(publicBuyerKeyArmored)).keys, // for verification (optional)
        privateKeys: [privateKey]                                           // for decryption
    });

    console.log('BUYER', decrypted);

    /////////////////
    // SELLER KEYS //
    /////////////////

    const publicSellerKeyArmored = fs.readFileSync('./output/seller_public.key', 'utf8');
    const privateSellerKeyArmored = fs.readFileSync('./output/seller_private.key', 'utf8');

    const {keys: [privateSellerKey]} = await openpgp.key.readArmored(privateSellerKeyArmored);

    const {data: decryptedSellerVersion} = await openpgp.decrypt({
        message: await openpgp.message.readArmored(data),              // parse armored message
        publicKeys: (await openpgp.key.readArmored(publicSellerKeyArmored)).keys, // for verification (optional)
        privateKeys: [privateSellerKey]                                           // for decryption
    });

    console.log('SELLER', decryptedSellerVersion);
})();


