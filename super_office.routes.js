module.exports = (app) => {
    const super_offices = require('../controllers/super_office.controller.js');


    app.post('/super_offices', super_offices.create);

    
    app.get('/super_offices', super_offices.findAll);

   
    app.get('/super_offices/:super_officeId', super_offices.findOne);

    
    app.put('/super_offices/:super_officeId', super_offices.update);

    
    app.delete('/super_offices/:super_officeId', super_offices.delete);
}
