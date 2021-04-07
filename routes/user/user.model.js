const mongoose = require('mongoose');

// Environment //
const environment = require('../../common/environment');

// Crypto //
const crypto = require('../../common/crypto/crypto');

// Criando o modelo dos usuarios //
const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    }

});

const hashPassword = (obj, next) => {
    try {
        const password = obj.password;
        const passwordEncrypted = crypto.encrypt(password);
        obj.password = passwordEncrypted;
    } catch (err) {
        console.error(err);
        next();
    } finally {
        next();
    }
}

// Middleware //
const save = function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    } else {
        hashPassword(user, next);
    }
}

const update = function (next) {
    if (!this.getUpdate().password) {
        next();
    } else {
        hashPassword(this.getUpdate(), next);
    }
}

userSchema.pre('save', save);
userSchema.pre('findOneAndUpdate', update);
userSchema.pre('updateOne', update);

module.exports = mongoose.model('user', userSchema);