const stock_trader = require('../models/stock_trader.model.js');

// Create and Save a new stock_trader
exports.create = (req, res) => {
    // Validate request
    if(!req.body.username) {
        return res.status(400).send({
            message: "stock_trader content can not be empty"
        });
    }

    // Create a stock_trader
    const stock_trader = new Stock_trader({
        username: req.body.username || "Untitled stock_trader", 
        name: req.body.name,
        email : req.body.email,
        adress : req.body.adress,
        description : req.body.description,
        phone_number : req.body.phone_number,
        desscription : req.body.description,
        password: req.body.password

    });

    // Save stock_trader in the database
    stock_trader.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the stock_trader."
        });
    });
};

// Retrieve and return all stock_trader from the database.
exports.findAll = (req, res) => {
    Stock_trader.find()
    .then(stock_traders => {
        res.send(stock_traders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stock_traders."
        });
    });
};

// Find a single stock_trader with a stock_traderId
exports.findOne = (req, res) => {
    Stock_trader.findById(req.params.stock_traderId)
    .then(stock_trader => {
        if(!stock_trader) {
            return res.status(404).send({
                message: "stock_trader not found with id " + req.params.stock_traderId
            });            
        }
        res.send(stock_trader);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "stock_trader not found with id " + req.params.stock_traderId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving stock_trader with id " + req.params.stock_traderId
        });
    });
};

// Update a stock_trader identified by the stock_traderId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.username) {
        return res.status(400).send({
            message: "stock_trader content can not be empty"
        });
    }

    // Find stock_trader and update it with the request body
    Stock_trader.findByIdAndUpdate(req.params.stock_traderId, {
        username: req.body.username || "Untitled stock_trader", 
        name: req.body.name,
        email : req.body.email,
        adress : req.body.adress,
        description : req.body.description,
        phone_number : req.body.phone_number,
        desscription : req.body.description,
        password: req.body.password


    }, {new: true})
    .then(stock_trader => {
        if(!stock_trader) {
            return res.status(404).send({
                message: "stock_trader not found with id " + req.params.stock_traderId
            });
        }
        res.send(stock_trader);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "stock_trader not found with id " + req.params.stock_traderId
            });                
        }
        return res.status(500).send({
            message: "Error updating stock_trader with id " + req.params.stock_traderId
        });
    });
};

// Delete a stock_trader with the specified stock_traderId in the request
exports.delete = (req, res) => {
    Stock_trader.findByIdAndRemove(req.params.stock_traderId)
    .then(stock_trader => {
        if(!stock_trader) {
            return res.status(404).send({
                message: "stock_trader not found with id " + req.params.stock_traderId
            });
        }
        res.send({message: "stock_trader deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "stock_trader not found with id " + req.params.stock_traderId
            });                
        }
        return res.status(500).send({
            message: "Could not delete stock_trader with id " + req.params.stock_traderId
        });
    });
};
