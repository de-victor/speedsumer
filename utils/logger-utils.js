const log4j = require('log4js');



const buildLogger = (source)=>{
    const logger = log4j.getLogger(source);
    logger.level = 'info';
    return logger;
};



module.exports = {buildLogger};