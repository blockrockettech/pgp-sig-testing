const fs = require('fs');
const openpgp = require('openpgp');

const ethereumPrivateKey = 'cd916673ec0cb4803d9c5ff2e68b5377da9edef8e67d5ec84ff3f362004c3482';
const buffKey = Buffer.from(ethereumPrivateKey);

const privateKey = openpgp.util.Uint8Array_to_str(buffKey);

const options = {
    curve: 'secp256k1',
    userIds: {name: 'seller', email: 'seller@metafactory.ai'},
    numBits: 2048,
    material: {
        key: privateKey,
    }
};

openpgp.generateKey(options)
    .then(function (key) {
        console.log(key.privateKeyArmored);
        fs.writeFileSync('./output/seller_public.key', key.publicKeyArmored, 'utf8');
        console.log(key.publicKeyArmored);
        fs.writeFileSync('./output/seller_private.key', key.privateKeyArmored, 'utf8');
    })
    .catch(function (error) {
        console.log(error);
    });
