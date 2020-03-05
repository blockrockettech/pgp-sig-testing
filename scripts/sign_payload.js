const fs = require('fs');
const openpgp = require('openpgp');

openpgp.initWorker({
    path: 'openpgp.worker.js'
});

const keys = [
    fs.readFileSync('./output/buyer_public.key', 'utf8'),
    fs.readFileSync('./output/seller_public.key', 'utf8')
];

openpgp.key.readArmored(keys[0])
    .then((firstKey) => {
        openpgp.key.readArmored(keys[1])
            .then((secondKey) => {

                const secretPayload = {
                    'value': '£30',
                    'size': 'XL',
                    'bidder': 'Satoshi',
                };

                const options = {
                    // You can also call fromFile()!
                    message: openpgp.message.fromText(JSON.stringify(secretPayload)),
                    publicKeys: [firstKey.keys[0], secondKey.keys[0]]
                };

                openpgp.encrypt(options).then(ciphertext => {
                    let encrypted = ciphertext.data;
                    console.log(encrypted);
                    fs.writeFileSync('./output/encrypted.msg', encrypted, 'utf8');

                });

            });
    });
