const fs = require('fs');
const openpgp = require('openpgp');

const ipfsClient = require('ipfs-http-client');

const ipfs = ipfsClient({
    host: 'ipfs.infura.io',
    port: '5001',
    protocol: 'https'
});

openpgp.initWorker({
    path: 'openpgp.worker.js'
});

const keys = [
    fs.readFileSync('./output/buyer_public.key', 'utf8'),
    fs.readFileSync('./output/seller_public.key', 'utf8')
];

(async () => {

    const firstKey = await openpgp.key.readArmored(keys[0]);
    const secondKey = await openpgp.key.readArmored(keys[1]);

    const secretPayload = {
        'value': '£30',
        'size': 'XL',
        'bidder': 'Satoshi',
        'generated': Date.now(),
    };

    const options = {
        message: openpgp.message.fromText(JSON.stringify(secretPayload)),
        publicKeys: [firstKey.keys[0], secondKey.keys[0]]
    };

    const ciphertext = await openpgp.encrypt(options);
    const encrypted = ciphertext.data;
    console.log(encrypted);
    fs.writeFileSync('./output/encrypted.msg', encrypted, 'utf8');

    const ipfsOptions = {
        pin: true,
        content: Buffer.from(encrypted)
    };

    const response = await ipfs.add(ipfsOptions);
    console.log(`Pinned on IPFS
        ->   https://ipfs.infura.io/ipfs/${response[0].hash}
    `);
})();


