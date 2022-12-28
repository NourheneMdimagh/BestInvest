const mongoose = require('mongoose');

const OfficeSchema = mongoose.Schema({
    username :
    {
        type: String   
    },
    name :
    {
        type: String   
    },
    
    email: {
            type: String,
            unique: [true, 'The email is unique']
           
    },
    
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Office', OfficeSchema);