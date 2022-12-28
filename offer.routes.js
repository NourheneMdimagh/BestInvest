module.exports = (app) => {
    const offer = require('../controllers/investor.controller.js');


    app.post('/offer', offer.create);

    
    app.get('/offer', offer.findAll);

   
    app.get('/offer/:customerId', offer.findOne);

    
    app.put('/offer/:customerId', offer.update);

    
    app.delete('/offer/:customerId', offer.delete);
}
