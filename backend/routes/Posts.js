const express = require("express");
const { route } = require("..");
const router = express.Router();
//const { Posts } = require("../models");

const postCtrl = require ('../controllers/Posts'); 

router.get('/', postCtrl.getAllPosts);
router.get("/byId/:id", postCtrl.getOnePost); 
router.post('/', postCtrl.createPost); 
router.put('/:id', postCtrl.modifyPost); 
router.delete('/:id', postCtrl.deletePost); 



module.exports = router;
