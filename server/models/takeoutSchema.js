const mongoose = require('mongoose');

const takeout = new mongoose.Schema({
    restaurantName: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: true}

});

module.exports = mongoose.model('Restaurant', takeout);