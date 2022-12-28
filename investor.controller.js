const Investor = require('../models/investor.model.js');
// Create and Save a new investor
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "investor content can not be empty"
        });
    }

    // Create a investor
    const investor = new Investor({
        username : req.body.username,
        name : req.body.name,
        email : req.body.email,
        adress : req.body.adress,
        date_of_birth : req.body.date_of_birth,
        password: req.body.password
        
    });

    // Save investor in the database
    investor.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the investor."
        });
    });
};

// Retrieve and return all investor from the database.
exports.findAll = (req, res) => {
    Investor.find()
    .then(investors => {
        res.send(investors);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving investors."
        });
    });
};

// Find a single investor with a investorId
exports.findOne = (req, res) => {
    Investor.findById(req.params.investorId)
    .then(investor => {
        if(!investor) {
            return res.status(404).send({
                message: " not found with id " + req.params.investorId
            });            
        }
        res.send(investor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "investor not found with id " + req.params.investorId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving investor with id " + req.params.investorId
        });
    });
};

// Update a investor identified by the investorId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "investor content can not be empty"
        });
    }

    // Find investor and update it with the request body
    Investor.findByIdAndUpdate(req.params.investorId, {
        
        username : req.body.username,
        name : req.body.name,
        email : req.body.email,
        adress : req.body.adress,
        date_of_birth : req.body.date_of_birth,
        password: req.body.password


    }, {new: true})
    .then(investor => {
        if(!investor) {
            return res.status(404).send({
                message: "investor not found with id " + req.params.investorId
            });
        }
        res.send(investor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "investor not found with id " + req.params.investorId
            });                
        }
        return res.status(500).send({
            message: "Error updating investor with id " + req.params.investorId
        });
    });
};

// Delete a investor with the specifiedinvestorId in the request
exports.delete = (req, res) => {
    Investor.findByIdAndRemove(req.params.investorId)
    .then(investor => {
        if(!investor) {
            return res.status(404).send({
                message: "investor not found with id " + req.params.investorId
            });
        }
        res.send({message: "investor deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "investor not found with id " + req.params.investorId
            });                
        }

        return res.status(500).send({
            message: "Could not delete investor with id " + req.params.investorId
        });
    });
};
