const userRepository = require('../repository/user-repository');
const loggerBuild = require('../utils/logger-utils');

let profileCache = [];

const buildProfile = async (username)=>{
    let profile = profileCache.find((it)=> it.name == userRepository);
    if(profile && profile.length == 0){
        profile = await userRepository.findUserByName(username)
        profileCache.push(profile);
        return profile;
    }
    else{
        profile = await userRepository.findUserByName(username);
    }
    return profile;
};

const findProfileByUsername = async (username)=>{
    const logger = loggerBuild.buildLogger('user-service#findProfileByUsername');
    let profile = profileCache.find((it)=> it.name == username);
    
    if(!profile || profile.length == 0){
        logger.info('no cache');
        profile = await userRepository.findUserByName(username)
        profileCache.push(profile);
        return profile;
    }
    
    return profile;
};


module.exports = {findProfileByUsername, buildProfile};