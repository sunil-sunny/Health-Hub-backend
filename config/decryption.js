/* @author Rudra Makwana <rd851601@dal.ca> */

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = "PASSWORDPROTECTION";

const decrypt = (value) => {
    decipher = crypto.createDecipher(algorithm, key);
    let decrypted = decipher.update(value, 'hex', 'utf8') + + decipher.final('utf8');
    return decrypted;
}

module.exports = decrypt;