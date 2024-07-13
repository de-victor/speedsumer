const express = require('express');
const userService = require('../service/user-service');
const loggerBuild = require('../utils/logger-utils');

const router = express.Router();
const path = '/user';

router.get(path, async function(req, res){
    const logger = loggerBuild.buildLogger('user-controller-userByName');
    try{
        validateFindByUserParam(req);
        const data = await userService.findProfileByUsername(req.query.username);
        res.send(data);
    }
    catch(err){
        logger.error('something went wrong', err);
        res.status(412).send(err);
    }
});

const validateFindByUserParam = (req)=>{
    const errorJson = {
        msg: '',
        fields: [],
        code: 412

    };
    if(!req.query.username){
        errorJson.fields.push("username");
    }
    if(errorJson.fields.length > 0){
        errorJson.msg = 'Required fields';
        throw errorJson;
    }
};

module.exports = router;