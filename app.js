

const express = require("express");

const https = require('https');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


var platform;
var player;


var dat;
var obj;




app.get("/",function(req,res){
  console.log("click");
  //res.write(obj.data.platformInfo.platformSlug) //output specific data from json
  res.sendFile(__dirname + '/index.html'); //input in index.html
    })


app.post("/",function(req,rese){
  console.log(req.body.plat); 
  platform=req.body.plat; //store user value in variable

  console.log("post recieved");

  const options = {
    hostname: 'public-api.tracker.gg',
    port: 443,
    path: '/v2/apex/standard/profile/' + platform + '/Daltoosh', //variable value in path
    method: 'GET',
    headers: {
        'TRN-Api-Key': '592bb5cc-c382-4fca-8f96-9983b94374b7',
    },
};

  const reqe = https.request(options, res => {

    console.log(`statusCode: ${res.statusCode}`);
    console.log(platform);
  
    const data = [];
      res.on("data", (d) => {
          data.push(d);
      }).on('end', function() {
          //at this point data is an array of Buffers
          //so Buffer.concat() can make us a new Buffer
          //of all of them together
          const buffer = Buffer.concat(data);
           obj = JSON.parse(buffer.toString()); //list the whole data in json 
          console.log(obj.data.platformInfo);
          dat=obj.data.platformInfo.platformSlug; //user platform from json data
          console.log(dat)
          rese.send("platform:"+dat); //output on webpage
      });

  
      
  });
  

  reqe.on('error', error => {
    console.error(error);
  });
  
  reqe.end();


})


    app.listen(3000,function(){
      console.log("server is running"); 
   })

 