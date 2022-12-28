module.exports = (app) => {
    const office = require('../controllers/investor.controller.js');


    app.post('/office', office.create);

    
    app.get('/office', office.findAll);

   
    app.get('/office/:customerId', office.findOne);

    
    app.put('/office/:customerId', office.update);

    
    app.delete('/office/:customerId', office.delete);
}
