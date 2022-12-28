const Office = require('../models/office.model.js');
// Create and Save a new office
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "office content can not be empty"
        });
    }

    // Create a office
    const office = new Office({
        username : req.body.username,
        name : req.body.name,
        password: req.body.password
        
       

    });

    // Save office in the database
    office.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the office."
        });
    });
};

// Retrieve and return all office from the database.
exports.findAll = (req, res) => {
    Office.find()
    .then(offices => {
        res.send(offices);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving offices."
        });
    });
};

// Find a single office with a officeId
exports.findOne = (req, res) => {
    Office.findById(req.params.officeId)
    .then(office => {
        if(!office) {
            return res.status(404).send({
                message: " not found with id " + req.params.officeId
            });            
        }
        res.send(office);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "office not found with id " + req.params.officeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving office with id " + req.params.officeId
        });
    });
};

// Update a office identified by the officeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "office content can not be empty"
        });
    }

    // Find office and update it with the request body
    Office.findByIdAndUpdate(req.params.officeId, {
        
        username : req.body.username,
        name : req.body.name,
        email : req.body.email,
        password: req.body.password

        
    }, {new: true})
    .then(office => {
        if(!office) {
            return res.status(404).send({
                message: "office not found with id " + req.params.officeId
            });
        }
        res.send(office);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "office not found with id " + req.params.officeId
            });                
        }
        return res.status(500).send({
            message: "Error updating office with id " + req.params.officeId
        });
    });
};

// Delete a office with the specifiedofficeId in the request
exports.delete = (req, res) => {
    Office.findByIdAndRemove(req.params.officeId)
    .then(office => {
        if(!office) {
            return res.status(404).send({
                message: "office not found with id " + req.params.officeId
            });
        }
        res.send({message: "office deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "office not found with id " + req.params.officeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete office with id " + req.params.officeId
        });
    });
};
