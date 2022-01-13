
const { Posts }  = require("../models");
const { Likes }  = require('../models/'); 
const { Signalements } = require("../models"); 


//imageUpload 
const multer = require('multer');
const path = require('path');
const fs = require('fs');


//will be used to handle token security 
const jwt = require('jsonwebtoken');
// ??? 
const { setUncaughtExceptionCaptureCallback } = require('process');


//GET Renvoie un tableau de tous les posts 

exports.getAllPosts =  async (req, res) => {

    try {
        const listOfPosts = await Posts.findAll();
        console.log(listOfPosts); 
        res.json(listOfPosts);
    }
    catch(e) {
        console.log('Catch an error: ', e)
    }
};

// GET Query on post by ID 
exports.getOnePost = async (req, res) => {
    const id = req.params.id; 
    const post = await Posts.findByPk(id); 
    res.json(post); 
    //Pk = Primary Key
}; 


// POST -- Creating a new post

exports.createPost = async ( req, res, next) => {
    //console.log('req.body :' + req.body);

    let postContent = {
        postText: req.body.postText,
        //pour le moment l'image provoque une erreur 
        //image: req.file.path
    }
   
    const post = await Posts.create(postContent)
    .then(post => {
        return res.status(201).json(post); 
    })
    .catch( error => {return res.status(500).json( {error: error, message: 'erreur'})});
    
    console.log('post : '+ post);
}


// Modify a post // PUT


exports.modifyPost = async (req, res, next) => {
    const id = req.params.id; 
    const post = await Posts.findByPk(id); 
    //console.log(post); 
    console.log(post.postText);
    
    await post.update({ postText: req.body.postText })
      .then(() => res.status(200).json({ post, message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };


exports.deletePost = async (req, res) => {
    
    //need to find a way to  store the userId of the user clickin , the userId of the user that made the comment and the adminuserId

   
        const id = req.params.id; 
        const post = await Posts.findByPk(id); 
        post.destroy();
    
    

};


//testLikes 


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
 

 //Signalements 


exports.addSignal = async ( req, res, next) => {
    console.log('hello'); 

   //pour récupérer le userId utiliser plus tard le localstorage plutôt que le req.body
//    const userId = req.prams.user; 
//    const postId = req.params.id; 
//    console.log(userId);
//    console.log(postId); 

   await Signalements.create({
       postId: req.body.postId, 
       userId: req.body.userId
   })
   .then(signal => {
       return res.status(201).json("YESS"); 
   })
   .catch( error => res.status(500).json( {error: error, message: 'erreur'}));
}; 

exports.deleteSignal = async ( req, res, next) => {
   
    res.json(" coucou"); 
};


exports.getAllSignals = async (req,res, next) => {
    try {
        const listOfSignals = await Signalements.findAll();
        console.log(listOfSignals); 
        res.json(listOfSignals);
    }
    catch(e) {
        console.log('Catch an error: ', e)
    }
}; 


// exports.deleteSignal =  async (req, res, next) => {
//     // to be changed to localStorage 
//    // userConnected = req.body.userConnected ;  
    
//     //signalementId = req.body.signalementId ; 
//     await Signalements.findOne({ where: { id: 1 } })
//     .then( signalement => {
//         signalement.destroy()
//         .then(() => {
//             return res.status(201).json("Signal deleted");
//         })   
//         .catch(error => res.status(500).json( {error: error, message: 'erreur de suppression'}));
//     })
//     .catch(error => res.status(500).json( {error: error, message: 'Ne trouve pas le signalement'}));

//     //const user = await Users.findByPk(userConnected); 

//     //isAdmin à mettre dans un middleware
//     //if (user.isAdmin == 1) {
       
        
//     //}
    
//     //Je n'ai pas réussi à intégrer la try/catch correctement 

// };