const express = require("express");
//const { route } = require("..");
const router = express.Router();

const multer = require('../middlewares/multer');
const postCtrl = require ('../controllers/Posts'); 
const auth = require('../middlewares/auth')

router.get('/', auth, postCtrl.getAllPosts);
router.get("/byId/:id", auth,postCtrl.getOnePost); 
router.post('/', multer,auth, postCtrl.createPost); 
router.put('/:id', auth, postCtrl.modifyPost); 
router.delete('/:id', auth, postCtrl.deletePost); 

router.post('/likes', auth, postCtrl.addLike); 

router.post('/signal', auth, postCtrl.addSignal); 
router.get('/signal', auth, postCtrl.getAllSignals);
router.delete('/signal', auth, postCtrl.deleteSignal); 




module.exports = router;
