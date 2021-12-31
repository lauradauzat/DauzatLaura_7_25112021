const { Likes }  = require('../models/'); 
const { Posts } = require('../models/');

//doesn't work try again later

exports.addLike = ( req, res, next) => {
   //pour récupérer le userId utiliser plus tard le localstorage plutôt que le req.body
   const userId = req.body.userId; 
   const postId = req.body.postId; 
   console.log("USER ID  : " + userId);
   console.log(postId); 

   const newLike = Likes.create({
       userId: userId, 
       postId: postId
   }).then(like => {
       return res.status(201).json("YESS"); 
   })
   .catch( error => {return res.status(500).json( {error: error, message: 'erreur'})});
}; 


