const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const auth = require("../middlewares/auth"); 

const commentCtrl = require('../controllers/Comments'); 

router.get('/:postId', commentCtrl.getComments); 
router.post('/', commentCtrl.postComment); 
router.delete('/:commentId', auth, commentCtrl.deleteComment); 
router.put('/:commentId', auth, commentCtrl.updateComment); 


  
module.exports = router; 
