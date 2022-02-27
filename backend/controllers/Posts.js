
const { Posts, Comments }  = require("../models");
//imageUpload 
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { setUncaughtExceptionCaptureCallback } = require('process');
const { REPL_MODE_SLOPPY } = require("repl");


//GET Renvoie un tableau de tous les posts 

exports.getAllPosts =  async (req, res) => {
    const isAdmin = res.locals.isAdmin;
    const currentUser = res.locals.userId;
    console.log('isadmin'+ isAdmin);

    try {
        const listOfPosts = await Posts.findAll(
        );
        //console.log(listOfPosts); 
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

}; 


// POST -- Creating a new post

exports.createPost = async ( req, res, next) => {
    //console.log('req.body :' + req.body);

    let postContent = {}; 

    if (req.file) {
        postContent = {
            postText: req.body.postText,
            UserId: req.body.UserId,
            image: req.file.path
        }
    }  else {
        postContent = {
            postText: req.body.postText,
            UserId: req.body.UserId,
        } 
    }

    const post = await Posts.create(postContent)
    .then(post => {
        return res.status(201).json(post); 
    })
    .catch( error => {return res.status(500).json( {error: error, message: 'erreur'})});
    //console.log('post : '+ post);
}


// Modify a post // PUT


exports.modifyPost = async (req, res, next) => {
    const id = req.params.id; 
    const post = await Posts.findByPk(id); 

    //console.log(post); 
    //console.log(post.postText);
    //let postContent = {}; 

    // post.postText = req.body.postText; 
    // post.image = req.file.path; 

    if (req.file) {

        postContent = {
            postText: req.body.postText,
            image: req.file.path
        }

    }  else {
        postContent = {
            postText: req.body.postText
        }
    }
    const isAdmin = res.locals.isAdmin;
    const currentUser = res.locals.userId;

        // if( (isAdmin) || (currentUser == post.UserId)) {
            // post.update({
            //     postText : req.body.postText,
            //     image: req.file.path
            // })
            post.update(postContent)
            .then((post) => res.status(200).json({ post, postContent, message: 'Objet modifié !'}))
            .catch(error => res.status(400).json({ error }));
        // }




    //new try 


    // let postContent = {}; 
    // const id = req.params.id; 


    // if (req.file) {

    //     postContent = {
    //         postText: req.body.postText,
    //         image: req.file.path
    //     }

    // }  else {
        
    //     postContent = {
    //         postText: req.body.postText
    //     }
        
    // }


    // const post = await Posts.findByPk(id);
    // console.log(postContent); 
    // console.log(post);
    // post.update(postContent)
    // .then(post => {
    //     return res.status(201).json(post); 
    // })
    // .catch( error => {return res.status(500).json( {error: error, message: 'erreur'})});


    ///try3 
    // const id = req.params.id;
    // const postText = req.body.postText;
    // const image = req.body.image;
    // await Posts.update({ postText, image }, { where: { id: id } })

    //   .then(() => {
    //     res.status(200).json({ message: "update with succes !" });
    //   })
    //   .catch((error) => {
    //     res.status(500).json({ error });
    //   });

   // try4

    //   const postObject = req.file ?
    //   {
    //     ...JSON.parse(req.body.post),
    //     image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    //   } : { ...req.body };

    // const post = await Posts.findByPk(id);
    // post.update({...postObject})
    //   .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    //   .catch(error => res.status(400).json({ error }));
     


  };


exports.deletePost = async (req, res) => {
    
    //need to find a way to  store the userId of the user clickin , the userId of the user that made the comment and the adminuserId

        // const userConnectedId = window.localStorage.getItem('id'); 
        // const userConnected = await Users.findByPk(userConnectedId); 
        const id = req.params.id; 
        const isAdmin = res.locals.isAdmin;
        const currentUser = res.locals.userId;
        console.log('isadmin' + isAdmin + '    ' + currentUser);

        
            const post = await Posts.findByPk(id); 
    
             if( (isAdmin) || (currentUser == post.UserId)) {
                post.destroy()
                .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                .catch(error => res.status(403).json({ error: error }));
                
        
             } 
};




