const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
// const authRoute = require('./src/routes/auth');
// app.use('/api', authRoute);

//public dir for heroku
const publicDirectory = path.join(__dirname, "client/build");
app.use(express.static(publicDirectory));

require('./src/db/mongoose');
app.use(express.static('./src/public'));

const db = require("./src/models");
const Role = db.role;
initial();
if (process.env.NODE_ENV === "production") {  
 app.use(express.static(path.join(__dirname, './build'))); //set
}

function initial(){
 Role.estimatedDocumentCount((error, count)=>{
  if(!error && count ===0){
   new Role({name: "user"}).save(error =>{
    if(error){
     console.log('error', error)
    }
    console.log("added 'user' to roles collection");
   });

   new Role({name: "moderator"}).save(error =>{
    if(error){
     console.log('error', error)
    }
    console.log("added 'moderator' to roles collection");
   });

   new Role({name: "admin"}).save(error =>{
    if(error){
     console.log('error', error)
    }
    console.log("added 'admin' to roles collection");
   });
  }
 });
}//initial



app.get("/",  (req, res) =>{
 res.sendFile(path.join(__dirname, "./build/index.html"));
});
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);


// test route
app.get("/",  (req, res) =>{ res.send('hello from the server')});

const PORT = process.env.PORT || 3004; //this must be the same as in the client package.json =>   "proxy":"http://localhost:3014/",
app.listen(PORT, () => {
 console.log(`Server is up and listening to PORT: ${PORT}`);
});

