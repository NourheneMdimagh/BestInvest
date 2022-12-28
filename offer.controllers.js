const Offer = require('../models/offer.model.js');
// Create and Save a new offer
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "offer content can not be empty"
        });
    }

    // Create a offer
    const offer = new Offer({
        date : req.body.date,
        owner : req.body.owner,
        conditions : req.body.conditions
       

    });

    // Save offer in the database
    offer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the offer."
        });
    });
};

// Retrieve and return all offer from the database.
exports.findAll = (req, res) => {
    Offer.find()
    .then(offers => {
        res.send(offers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving offers."
        });
    });
};

// Find a single offer with a offerId
exports.findOne = (req, res) => {
    Offer.findById(req.params.offerId)
    .then(offer => {
        if(!offer) {
            return res.status(404).send({
                message: " not found with id " + req.params.offerId
            });            
        }
        res.send(offer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "offer not found with id " + req.params.offerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving offer with id " + req.params.offerId
        });
    });
};

// Update a offer identified by the offerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "offer content can not be empty"
        });
    }

    // Find offer and update it with the request body
    Offer.findByIdAndUpdate(req.params.offerId, {
        
        date : req.body.date,
        owner : req.body.owner,
        conditions : req.body.conditions


    }, {new: true})
    .then(offer => {
        if(!offer) {
            return res.status(404).send({
                message: "offer not found with id " + req.params.offerId
            });
        }
        res.send(offer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "offer not found with id " + req.params.offerId
            });                
        }
        return res.status(500).send({
            message: "Error updating offer with id " + req.params.offerId
        });
    });
};

// Delete a offer with the specifiedofferId in the request
exports.delete = (req, res) => {
    Offer.findByIdAndRemove(req.params.offerId)
    .then(offer => {
        if(!offer) {
            return res.status(404).send({
                message: "offer not found with id " + req.params.offerId
            });
        }
        res.send({message: "offer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "offer not found with id " + req.params.offerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete offer with id " + req.params.offerId
        });
    });
};
