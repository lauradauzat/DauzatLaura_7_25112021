
const Posts  = require("../models/Posts");

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
    console.log('req.body :' + req.body);

    let postContent = {
        postText: req.body.postText,
        image: req.file.path
    }
   
    const post = await Posts.create(postContent);
    res.status(200).send(post); 
    console.log('post : '+ post);
}


// Modify a post // PUT

exports.modifyPost = async (req, res) => {
    const post = req.body; 
    
    post.set({
    title: post.body.title,
    postText: post.body.postText, 
    
    });
    await post.save();
}


exports.deletePost = async (req, res) => {
    
    //need to find a way to  store the userId of the user clickin , the userId of the user that made the comment and the adminuserId

   
        const id = req.params.id; 
        const post = await Posts.findByPk(id); 
        post.destroy();
    
    

}


