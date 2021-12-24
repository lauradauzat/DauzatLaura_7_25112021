const { Likes }  = require('../models/'); 
const { Posts } = require('../models/');

//doesn't work try again later

exports.addLike = async ( req, res, next) => {
    console.log('hello'); 

   //pour récupérer le userId utiliser plus tard le localstorage plutôt que le req.body
   const userId = req.body.id; 
   const postId = req.params.id; 
   console.log(userId);
   console.log(postId); 

   await Likes.create({
       userId: 5, 
       postId: 2
   })
   .then(like => {
       return res.status(201).json("YESS"); 
   })
   .catch( error => res.status(500).json( {error: error, message: 'erreur'}));
}; 


