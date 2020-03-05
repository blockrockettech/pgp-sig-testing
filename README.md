# PGP Signing Demo

* Goals
* Sign data with two PGP public keys which are based on a Ethereum private key
* Both parties should be able to decrypt the payload without the need for both keys

**WARNING DO NOT USE THE PRIVATE KEYS IN THIS REPO!**

### Execution order

* `Bob` generates PGP keys offchain using private key as seed
* `Bob` sends `public` key to client (webapp)
* `Alice` visits site - generates PGP key locally (in browser) using web3 enable private key
* `Alice` fills in required data
* `Alice`, in combination with `Bob`s `public` key, `signs` the payload
* `Alice` then places this on chain (via a smart contract) for all to see
* `Bob` then listens for new entries to this smart contract and can `decrypt` away using only `private` key he has
* Data could be stored on `IPFS` and then this is the hash used onchain only

### Demo scripts

1) `$ node ./scripts/generate_buyer_pgp_key.js`
2) `$ node ./scripts/generate_seller_pgp_key.js`
3) `$ node ./scripts/sign_payload.js`
4) `$ node ./scripts/decrypt_payload.js`
