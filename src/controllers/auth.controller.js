const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

exports.signup = (req, res)=>{
 const user = new User({
  username: req.body.username,
  email: req.body.email,
  password: bcrypt.hashSync(req.body.password, 8)
 });

 user.save((error, user)=>{
  if(error){
   res.status(500).send({message: error});
   return;
  }
  if (req.body.roles) {
   Role.find({name: { $in: req.body.roles }},
     (err, roles) => {
       if (err) {
         res.status(500).send({ message: err });
         return;
       }

       user.roles = roles.map(role => role._id);
       user.save(err => {
         if (err) {
           res.status(500).send({ message: err });
           return;
         }
         res.send({ message: "User was registered successfully!" });
       });
     }
   );
 } else {
   Role.findOne({ name: "user" }, (err, role) => {
     if (err) {
       res.status(500).send({ message: err });
       return;
     }

     user.roles = [role._id];
     user.save(err => {
       if (err) {
         res.status(500).send({ message: err });
         return;
       }
       res.send({ message: "User was registered successfully!" });
     });
   });
 }
 });
}

exports.signin = (req, res)=>{
 User.findOne({username: req.body.username})
  .populate('roles', '-__v')
  .exec((err, user) => {
   if (err) {
     res.status(500).send({ message: err });
     return;
   }
   
   if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  let passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }

  let token = jwt.sign({id: user.id}, config.secret, {expiresIn:86400});
  let authorties =[];
  for(let i=0; i<user.roles.length; i++){
    // console.log('87 auth.controller: ','\nZZZZ user: ',user
    //                                   ,'\nCCCC user.roles[i]: ',user.roles[i]
    //                                   ,'\nRRRR user.roles[i].username: ', user.roles[i].name)    
   authorties.push('ROLE_' +user.roles[i].name.toUpperCase());
  }
  res.status(200).send({
   id: user._id,
   username: user.username,
   email: user.email,
   role: authorties,
   accessToken: token
  });
 });
};//signin


/**
 * signin:
 * find username of the request in database, if it exists
 * compare password with password in database using bcrypt, if it is correct
 * generate a token using jsonwebtoken
 * return user information & access Token
 */