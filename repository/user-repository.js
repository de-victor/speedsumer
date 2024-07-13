const fetch = require('node-fetch');
const speedrunApiUtils = require('../utils/speedrun-api-utils');

const repositoryUrl = 'users';
const fullApiUrl = speedrunApiUtils.buildUrl(repositoryUrl);


const findUserByName = async (name)=>{
    let user = {};
    const resourceUrl = `${fullApiUrl}?name=${name}`;
    const data = await speedrunApiUtils.retrieveApiData(resourceUrl);

    if(data.data.length > 0){
        const root = data.data[0];
        user = retrieveBasicData(root, name);
        user.names = retrieveNames(root);
        user.socials = retrieveSocialData(root);
        
        user.personalBest = {
            rootUri: root.links.find((it)=> it.rel == 'personal-bests').uri,
            pbList: []
        };
    }
    
    return user;
};

const retrieveNames = (root)=>{
    names = {};

    for(att in root.names){
        if(root.names[att] != null && root.names[att] != 'null'){
            names[att] = root.names[att];
        }
    }

    return names;
};

const retrieveBasicData = (root, name)=>{
    let user = {};
    user.id = root.id;
    user.name = name,
    user.weblink = root.weblink;
    user.signup = root.signup;
    
    return user;
};

const retrieveSocialData = (root)=>{
    let socials = {};

    if(root.twitch){
        socials.twitch = root.twitch.uri;
    }
    if(root.youtube){
        socials.youtube = root.youtube.uri;
    }
    if(root.twitch){
        socials.twitch = root.twitch.uri;
    }
    
    return socials;
};

module.exports = {findUserByName}