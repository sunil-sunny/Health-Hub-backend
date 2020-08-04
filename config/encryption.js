/* @author Rudra Makwana <rd851601@dal.ca> */

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = "PASSWORDPROTECTION";

const encrypt = (value) => {
    cipher = crypto.createCipher(algorithm, key);
    let encrypted = cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
}

module.exports = encrypt;