const fs = require('fs');
const openpgp = require('openpgp');

const ethereumPrivateKey = '7fa2e55836ecb798894557c974d3c20ae482a602d41225986abc651cec2653c0';
const buffKey = Buffer.from(ethereumPrivateKey);

const privateKey = openpgp.util.Uint8Array_to_str(buffKey);

const options = {
    curve: 'secp256k1',
    userIds: {name: 'buyer', email: 'buyer@metafactory.ai'},
    numBits: 2048,
    material: {
        key: privateKey,
    }
};

openpgp.generateKey(options)
    .then(function (key) {
        console.log(key.privateKeyArmored);
        fs.writeFileSync('./output/buyer_public.key', key.publicKeyArmored, 'utf8');
        console.log(key.publicKeyArmored);
        fs.writeFileSync('./output/buyer_private.key', key.privateKeyArmored, 'utf8');
    })
    .catch(function (error) {
        console.log(error);
    });
