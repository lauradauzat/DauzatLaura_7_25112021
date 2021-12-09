
const { Posts } = require("../models/Posts");

//will be used to handle files / images
const fs = require('fs');
//will be used to handle token security 
const jwt = require('jsonwebtoken');
// ??? 
const { setUncaughtExceptionCaptureCallback } = require('process');


//GET Renvoie un tableau de tous les posts 

exports.getAllPosts =  async (req, res) => {
 
  
//   try {
//     const listOfPosts = await Posts.findAll();
//     res.json(listOfPosts);
//   } catch(err) {
//     alert(err); 
//   }


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

exports.createPost = async ( req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
}



