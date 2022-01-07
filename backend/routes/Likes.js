const express = require("express");
const router = express.Router();

const Likes  = require ('../controllers/Likes'); 

// Not used, doesn't work, déplacé dans les routes posts 

router.post('/', Likes.addLike);


module.exports = router;
