const { Router } = require('express');
const devController = require('./controllers/devController');


const routes = Router();

routes.get('/devs', devController.index);
routes.post('/devs', devController.store);
    

module.exports = routes;