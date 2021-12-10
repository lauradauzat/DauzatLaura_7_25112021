const Users  = require("../models/Users");
const bcrypt = require('bcrypt'); 

//jwt installé mais pas encore utilisé
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    const { username, password } = req.body;
    console.log('username : ' + username + '  password : ' + password); 
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash
      })
      .then(user => {
        return res.status(201).json("SUCCESS");
      })
      .catch( error => res.status(500).json( {error: error, message: 'erreur de création utilisateur'}));
     
    })
    .catch(error => res.status(500).json( {error: error, message: 'erreur mot de passe'})); 
};

exports.login =  async (req, res) => {

    const { username, password}  = req.body; 
    const user = await Users.findOne({ where: {username: username} }); 
 
    if (!user) res.json({ error: "User doesn't  exist"}); 
 
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({error: "Wrong password"}); 
 
      res.json ("You are logged in"); 
      
    }); 
};