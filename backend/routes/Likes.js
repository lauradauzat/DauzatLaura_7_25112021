const express = require("express");
const router = express.Router();

const { Likes } = require ('../controllers'); 

router.post('/', Likes.addLike);


module.exports = router;
