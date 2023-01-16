var express = require('express');
var server = express();
var routes = require('./routes/routes');
 
const server = express();

server.use(cors());

server.use(express.json());

server.use(routes);
 
server.listen(3000, (error) =>{
    if(!error)
        console.log(" started on 3000");
    else 
        console.log("Error occurred, server can't start", error);
    }
); 
