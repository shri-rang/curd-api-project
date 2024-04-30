const bodyParser = require("../util/body-parser");
const crypto = require("crypto");
const writeToFile = require('../util/write-to-file');
module.exports = async(req, res)=>{

        if(req.url === "/api/movies"){
                    try {
                        let body = await bodyParser(req) 
                        body.id = crypto.randomUUID();
                        req.movies.push(body);
                        writeToFile(req.movies);
                        res.writeHead(201,{"Content-Type" : "application/json"});
                         console.log("Request body", body);
                        res.end();
                        
                    } catch (error) {
                        res.writeHead( 400,{"Content-Type": "application/json"});
                        res.end(JSON.stringify({title:"Validation Failed",  message:"Request body not valid"}));   
                    } 
        } else{
                 res.writeHead( 404,{"Content-Type": "application/json"});
                res.end(JSON.stringify({title:"Not Found",  message:"Route Not Found"}));   
        }
}