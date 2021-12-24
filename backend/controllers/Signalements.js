const  { Signalements }  = require('../models/'); 

//doesn't work try again later

exports.addSignal = async ( req, res, next) => {
    console.log('hello'); 

   //pour récupérer le userId utiliser plus tard le localstorage plutôt que le req.body
//    const userId = req.prams.user; 
//    const postId = req.params.id; 
//    console.log(userId);
//    console.log(postId); 

   await Signalements.create({
       postId: req.params.id, 
       userId: req.body.id
   })
   .then(signal => {
       return res.status(201).json("YESS"); 
   })
   .catch( error => res.status(500).json( {error: error, message: 'erreur'}));
}; 
