const express = require("express");
const router = express.Router();

const likeCtrl = require ('../controllers/Likes'); 

router.post('/:id', likeCtrl.addLike);


module.exports = router;
