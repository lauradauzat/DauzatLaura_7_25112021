const { Comments } = require('../models/'); 
const fs = require('fs'); 

exports.getComments = async (req, res) => {
    const postId = req.params.postId;
       const comments = await Comments.findAll({ where: { PostId: postId } });
       res.json(comments);
};

exports.postComment = async (req, res) => {
    const comment = req.body;

    await Comments.create(comment)
    .then(comment => {
        return res.status(201).json(comment); 
    })
    .catch( error => {return res.status(500).json( {error: error, message: 'erreur'})});
};


exports.deleteComment = async (req, res) => {
    //use the commentId to delete the comment 
  
    const isAdmin = res.locals.isAdmin;
    const currentUser = res.locals.userId;
    const id = req.params.id; 
    //console.log(id);
    const comment = await Comments.findByPk(id); 

         if( (isAdmin) || (currentUser == comment.UserId)) {
           
            await comment.destroy().then(res.status(201).json({message: 'deleted'}))
            
            .catch(error => res.status(400).json({ error: error, message: 'erreur', message: 'erreur' }));
        }   
};

exports.updateComment = async (req, res) => {
    const id = req.params.id;
    const commentBody = req.body.commentBody;
    const currentUser = res.locals.userId;
    const comment = await Comments.findByPk(id)
    //.catch(error => res.status(500).json({ error: error, message: 'erreur', message: 'erreur' }));

    //if (currentUser == comment.UserId) {
        await comment.update({ commentBody });
        res.json(comment)
        .catch(error => res.status(400).json({ error: error, message: 'erreur', message: 'erreur' }));
    //}
  
  };
  