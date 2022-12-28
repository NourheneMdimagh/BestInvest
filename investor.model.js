const mongoose = require('mongoose');

const InvestorSchema = mongoose.Schema({
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
    
    
    address :
{
    type: String   
},
    date_of_birth :
    {
        type: String   
    },
    
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Investor', InvestorSchema);