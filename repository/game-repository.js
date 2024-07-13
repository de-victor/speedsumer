const fetch = require('node-fetch');
const speedrunApiUtils = require('../utils/speedrun-api-utils');

const repositoryUrl = 'games';
const fullApiUrl = speedrunApiUtils.buildUrl(repositoryUrl);

const findGameByName = async (name)=>{
    const resourceUrl = `${fullApiUrl}?name=${name}`;
    const data = speedrunApiUtils.retrieveApiData(resourceUrl);
    return data;
};

const findGameById = (id)=>{
    const resourceUrl = `${fullApiUrl}/${id}`;
    const data = speedrunApiUtils.retrieveApiData(resourceUrl);
    return data;
};


module.exports = {findGameByName, findGameById};