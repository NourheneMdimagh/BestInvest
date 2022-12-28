const Super_office = require('../models/super_office.model.js');

// Create and Save a new super_office
exports.create = (req, res) => {
    // Validate request
    if(!req.body.username) {
        return res.status(400).send({
            message: "super_office content can not be empty"
        });
    }

    // Create a super_office
    const super_office = new Super_office({
        username: req.body.username || "Untitled Super_office", 
        name: req.body.name,
        email : req.body.email,
        password: req.body.password


    });

    // Save super_office in the database
    super_office.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the super_office."
        });
    });
};

// Retrieve and return all super_office from the database.
exports.findAll = (req, res) => {
    Super_office.find()
    .then(super_offices => {
        res.send(super_offices);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving super_offices."
        });
    });
};

// Find a single super_office with a super_officeId
exports.findOne = (req, res) => {
    Super_office.findById(req.params.super_officeId)
    .then(super_office => {
        if(!super_office) {
            return res.status(404).send({
                message: "super_office not found with id " + req.params.super_officeId
            });            
        }
        res.send(super_office);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "super_office not found with id " + req.params.super_officeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving super_office with id " + req.params.super_officeId
        });
    });
};

// Update a super_office identified by the super_officeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.username) {
        return res.status(400).send({
            message: "super_office content can not be empty"
        });
    }

    // Find super_office and update it with the request body
    Super_office.findByIdAndUpdate(req.params.super_officeId, {
        username: req.body.username || "Untitled Super_office", 
        name: req.body.name,
        email : req.body.email,
        password: req.body.password


    }, {new: true})
    .then(super_office => {
        if(!super_office) {
            return res.status(404).send({
                message: "super_office not found with id " + req.params.super_officeId
            });
        }
        res.send(super_office);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "super_office not found with id " + req.params.super_officeId
            });                
        }
        return res.status(500).send({
            message: "Error updating super_office with id " + req.params.super_officeId
        });
    });
};

// Delete a super_office with the specified super_officeId in the request
exports.delete = (req, res) => {
    Super_office.findByIdAndRemove(req.params.super_officeId)
    .then(super_office => {
        if(!super_office) {
            return res.status(404).send({
                message: "super_office not found with id " + req.params.super_officeId
            });
        }
        res.send({message: "super_office deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "super_office not found with id " + req.params.super_officeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete super_office with id " + req.params.super_officeId
        });
    });
};
