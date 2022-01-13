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
    const commentId = req.params.commentId;
    
 //if (userThatWroteTheComment or Admin)) 
        await Comments.destroy({
            where: {
            id: commentId,
            },
        });
    
        res.json("DELETED SUCCESSFULLY");
    

   
};

exports.updateComment = async (req, res) => {
    const id = req.params.id;
    const userId = res.body.userId;
    const content = req.body.content;

    
  
    const comment = await Comments.update({ content }, { where: { id: id, UserId: userId } });
    res.json(comment);

  };
  