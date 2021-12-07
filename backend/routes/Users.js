
const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post('/login', async (req, res) => {
   const { username, password}  = req.body; 
   const user = await Users.findOne({ where: {username: username} }); 

   if (!user) res.json({ error: "User doesn't  exist"}); 

   bcrypt.compare(password, user.password).then((match) => {
     if (!match) res.json({error: "Wrong password"}); 

     res.json ("You are logged in"); 
     
   }); 



});
 

module.exports = router;
