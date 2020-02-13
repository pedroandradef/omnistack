const { Router } = require('express');
const devController = require('./controllers/devController');
const searchController = require('./controllers/searchController');


const routes = Router();

routes.get('/devs', devController.index);
routes.post('/devs', devController.store);
routes.post('/updateDev', devController.update);
routes.get('/search', searchController.index);
routes.post('/deleteDev', devController.delete);
    

module.exports = routes;