const { Users }  = require("../models");
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    const { username, email, password, isAdmin } = req.body;
    console.log('username : ' + username + '  password : ' + password); 
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        email: email,
        password: hash,
        isAdmin: isAdmin
      })
      .then(user => {
        return res.status(201).json("SUCCESS");
      })
      .catch( error => res.status(500).json( {error: error, message: 'erreur de création utilisateur'}));
     
    })
    .catch(error => res.status(500).json( {error: error, message: 'erreur mot de passe'})); 
};




exports.login =  async (req, res, next) => {

    const { username, password}  = req.body; 
  
    const user = await Users.findOne({ where: {username: username} }); 
 
    if (!user) res.status(401).json({ error: "User doesn't  exist"}); 
 
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({error: "Wrong password"}); 

      res.status(200).json({
        
        userId: user.id,
        isAdmin: user.isAdmin,
        token: jwt.sign(
          { userId: user.id, isAdmin: user.isAdmin },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' }
        )
      });
 
      res.json ("You are logged in"); 
      
    }); 

 
};


exports.getProfile = async (req, res, next) => {
  //maybe not body ? maybe dans le localStorage ? 
  const id = req.params.id; 
  const user = await Users.findByPk(id); 

  // le mettre dans un try catch
  res.status(200).json (user); 

}

exports.updateProfile = async (req, res, next) => {
  const id = req.params.id; 
  const user = await Users.findByPk(id);
  user.update({
    username: req.body.username,  
    email: req.body.email,
    isAdmin: req.body.isAdmin
  })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error: error }));
};

exports.deleteProfile = async (req, res, next) => {
  const id = req.params.id; 
  const user = await Users.findByPk(id); 
  const isAdmin = res.locals.isAdmin;
  const currentUser = res.locals.userId;
  
  if( (isAdmin) || (currentUser == user.id)) {
      user.destroy()
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(500).json({ error: error }));
  }
};


