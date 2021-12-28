const  { Signalements }  = require('../models/'); 
const { Users } = require('../models/'); 
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


exports.deleteSignal = async (req, res, next) => {
    // to be changed to localStorage 
    userConnected = req.body.userConnected ;  
    signalementId = req.body.signalementId ; 
    const signal = await Signalements.findByPk(signalementId);
    const user = await Users.findByPk(userConnected); 
    
    if (user.isAdmin == 1) {
        signal.destroy(); 
        return res.status(201).json("Signal deleted");
    }
    
    //Je n'ai pas réussi à intégrer la try/catch correctement 

};