const mongoose = require('mongoose');

const Super_officeSchema = mongoose.Schema({
    username: {
            type: String,
            unique: [true, 'The login is unique']
           
    },
    lastname: String,
    firstname: String,
    email: {
            type: String,
            unique: [true, 'The email is unique']
           
    },
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Super_office', Super_officeSchema);