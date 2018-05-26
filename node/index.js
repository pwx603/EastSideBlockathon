let EC = require('elliptic').ec;
let bitcoin = require('bitcoinjs-lib');
let bip32 = require('bip32')

var entropy = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 27, 28, 28, 30, 31, 32,33
];

function rng() {
    return Buffer.from([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 27, 28, 28, 30, 31, 32, 33
    ])
}

// Create and initialize EC context
// (better do it once and reuse it)
var ec = new EC('secp256k1');

// Generate keys
var key = ec.genKeyPair({
    entropy: entropy
});

console.log("key: ", key);

let priv = key.getPrivate('hex');
let pub = key.getPublic('hex');

console.log("Private key: ", priv.length);
console.log("Public key: ", pub);

var msg = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var signature = key.sign(msg);

var derSign = signature.toDER();

console.log(key.verify(msg ,derSign))

var newKey = ec.keyFromPublic(pub, 'hex');
console.log(key.verify(msg, derSign));



//console.log(signature);

// var keyPair = bitcoin.ECPair.makeRandom({ rng: rng })
// console.log(keyPair.toWIF());

// let priv =  'cQfoY67cetFNunmBUX5wJiw3VNoYx3gG9U9CAofKE6BfiV1fSRw7'
// console.log(priv.length);

//let restored = bip32.fromBase58(xpriv);

//console.log(signature.toDER());
