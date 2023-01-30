const mongoose = require('mongoose');

const Role = mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
})

module.exports = mongoose.model('Role', Role);