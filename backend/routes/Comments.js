const express = require("express");
const router = express.Router();
const { Comments } = require("../models");

const commentCtrl = require('../controllers/Comments'); 

router.get('/:postId', commentCtrl.getComments); 
router.post('/', commentCtrl.postComment); 
router.delete('/:commentId', commentCtrl.deleteComment); 
router.put('/:commentId', commentCtrl.updateComment); 


  
module.exports = router; 
