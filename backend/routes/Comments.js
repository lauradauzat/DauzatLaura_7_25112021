const express = require("express");
const router = express.Router();
const Comments = require("../models/Comments");
const auth = require("../middlewares/auth"); 

const commentCtrl = require('../controllers/Comments'); 

router.get('/:postId', commentCtrl.getComments); 
router.post('/', commentCtrl.postComment); 
// id = commentid for delete and put
router.delete('/:id', auth, commentCtrl.deleteComment); 
router.put('/:id', auth, commentCtrl.updateComment); 


  
module.exports = router; 
