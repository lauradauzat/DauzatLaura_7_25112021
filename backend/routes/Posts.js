const express = require("express");
//const { route } = require("..");
const router = express.Router();

const multer = require('../middlewares/multer');
const postCtrl = require ('../controllers/Posts'); 

router.get('/', postCtrl.getAllPosts);
router.get("/byId/:id", postCtrl.getOnePost); 
router.post('/', multer, postCtrl.createPost); 
router.put('/:id', postCtrl.modifyPost); 
router.delete('/:id', postCtrl.deletePost); 

router.post('/likes', postCtrl.addLike); 

router.post('/signal', postCtrl.addSignal); 
router.get('/signal', postCtrl.getAllSignals);
router.delete('/signal', postCtrl.deleteSignal); 




module.exports = router;
