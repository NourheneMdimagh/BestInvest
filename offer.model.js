const mongoose = require('mongoose');

const OfferSchema = mongoose.Schema({
    date :
    {
        type: String   
    },
    owner :
    {
        type: String   
    },
    conditions :
    {
        type: String   
    },
    timestamps: true
});

module.exports = mongoose.model('Offer', OfferSchema);