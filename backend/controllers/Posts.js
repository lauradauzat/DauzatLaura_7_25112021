
const { Posts }  = require("../models");
const { Likes }  = require('../models/'); 


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
        image: req.file.path
    }
   
    const post = await Posts.create(postContent);
    res.status(200).send(post); 
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
 