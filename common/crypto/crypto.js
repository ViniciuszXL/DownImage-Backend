const crypto = require('crypto');

// Environment //
const environment = require('../environment');

class Crypto {

    encrypt = (password) => {
        if (!password) {
            return '';
        }

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(environment.SECURITY.ALGORITHM, environment.SECURITY.SECRET_KEY, iv);
        const encrypted = Buffer.concat([ cipher.update(password), cipher.final() ]);
        return iv.toString('hex') + ';' + encrypted.toString('hex');
    }

    decrypt = (iv, content) => {
        const decipher = crypto.createDecipheriv(environment.SECURITY.ALGORITHM, environment.SECURITY.SECRET_KEY, Buffer.from(iv, 'hex'));
        const decrpyted = Buffer.concat([ decipher.update(Buffer.from(content, 'hex')), decipher.final() ]);
        return decrpyted.toString();
    }

    rand = () => {
        return Math.random().toString(36).substr(2);
    }

    generateToken = () => {
        const newToken = this.rand() + this.rand();
        return newToken.substr(0, 16);
    }

}

module.exports = new Crypto();