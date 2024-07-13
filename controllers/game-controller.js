const express = require('express');
const gameRepository = require('../repository/game-repository');
const loggerBuild = require('../utils/logger-utils');

const router = express.Router();
const path = '/game';

router.get(path, async function(req, res){
    const logger = loggerBuild.buildLogger('game-controller-game');
    try{
        let params = validateParams(req);
        logger.info(params);
        const data = await gameRepository.findGameByName('Yu-Gi-Oh! Forbidden Memories Category Extensions');
        res.send(data);
    }
    catch(err){
        logger.error('something went wrong', err);
        res.status(412).send(err);
    }
});

const validateParams = (req)=>{
    let params = {};
    let errorJson = {
        msg: '',
        fields: [],
        code: 412

    };
    if(!req.query.gameName){
        errorJson.fields.push("gameName");
    }
    if(!req.query.channelName){
        errorJson.fields.push("channelName");
    }

    if(errorJson.fields.length > 0){
        errorJson.msg = 'Required fields';
        throw errorJson;
    }
    
    params.gameName = req.query.gameName;
    params.channelName = req.query.channelName;

    return params;
};


module.exports = router;