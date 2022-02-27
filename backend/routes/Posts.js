const express = require("express");
//const { route } = require("..");
const router = express.Router();

const multer = require('../middlewares/multer');
const postCtrl = require ('../controllers/Posts'); 
const auth = require('../middlewares/auth')

router.get('/', auth, postCtrl.getAllPosts);
router.get("/byId/:id", auth,postCtrl.getOnePost); 
router.post('/', multer,auth, postCtrl.createPost); 
router.put('/:id', multer,auth, postCtrl.modifyPost); 
router.delete('/:id', auth, postCtrl.deletePost); 

module.exports = router;
