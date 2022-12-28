const mongoose = require('mongoose');

const OfficeSchema = mongoose.Schema({
    username :
    {
        type: String,
        unique: [true, 'The email is unique']
    },
    name :
    {
        type: String   
    },
    
    email: {
            type: String,
            unique: [true, 'The email is unique']
           
    },
    adress: {
        type: String,
    },
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Office', OfficeSchema);