const baseUrl = 'https://www.speedrun.com/api/v1';

const buildUrl = (repositoryUrl)=>{
    return `${baseUrl}/${repositoryUrl}`;
};

const retrieveApiData = async (uri)=>{
    const response = await fetch(uri);
    const data = await response.json();
    return data;
};


module.exports = {buildUrl, retrieveApiData};