const Users  = require("../models/Users");
const bcrypt = require('bcrypt'); 

//jwt installé mais pas encore utilisé
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });
      res.json("SUCCESS");
    });
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