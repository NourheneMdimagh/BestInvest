module.exports = (app) => {
    const investors = require('../controllers/investor.controller.js');


    app.post('/investors', investors.create);

    
    app.get('/investors', investors.findAll);

   
    app.get('/investors/:customerId', investors.findOne);

    
    app.put('/investors/:customerId', investors.update);

    
    app.delete('/investors/:customerId', investors.delete);
}
