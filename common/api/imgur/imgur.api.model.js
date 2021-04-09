const mongoose = require('mongoose');

// Environment //
const environment = require('../../environment');

const imgurSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    response: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('imgur_cache', imgurSchema);