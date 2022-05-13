const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
    {
        id: 'number',
        type: 'string',
        lastTime: 'number',
        gold: 'number',
        created: 'number'
    }
);