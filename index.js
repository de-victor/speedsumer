const express = require('express');
const controllers = [require('./controllers/game-controller'),
                     require('./controllers/user-controller')
];

var app = express();

controllers.forEach((it)=> app.use(it));

app.get('/', function(req, res){
    const ret = {
        description: 'Simple API project to parse speedrun.com data',
        ver: '0.0.1',
        author: 'atherion',
        SpeedRunAPIDoc: 'https://github.com/speedruncomorg/api'
    };
    res.send({info: ret});
});

app.listen(3000);