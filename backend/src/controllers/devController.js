const axios = require('axios');
const Dev = require('../models/developer');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }

        return response.json(dev);

    },

    async update(request, response){
        const{github_username, techs, latitude, longitude} = request.body;

        const techsArray = parseStringAsArray(techs)

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        const filter = {
            techs: techs,
            location: location,
            techs: techsArray,
        }

       dev = await Dev.findOneAndUpdate(github_username,filter); //findOneAndUpdated retorna o documento atualizado

       return response.json(dev)

    }, 

    async delete(request,response){
        const dev = request.body;
        let deleted = await Dev.findOneAndDelete(dev) //findOneAndDelete retorna o documento deletado
        return response.json(deleted)
    }
}