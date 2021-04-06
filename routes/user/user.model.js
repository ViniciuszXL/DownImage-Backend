const mongoose = require('mongoose');

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

module.exports = mongoose.model('user', userSchema);