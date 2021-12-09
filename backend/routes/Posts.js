const express = require("express");
const router = express.Router();
//const { Posts } = require("../models");

const postCtrl = require ('../controllers/Posts'); 

router.get('/', postCtrl.getAllPosts);
router.get("/byId/:id", postCtrl.getOnePost); 
router.post('/', postCtrl.createPost); 


//<----- code used before MVC ---->

// router.get("/", async (req, res) => {
//   const listOfPosts = await Posts.findAll();
//   res.json(listOfPosts);
// });

// //to query by ID
// router.get('/byId/:id', async (req, res) => {
//    const id = req.params.id; 
//    const post = await Posts.findByPk(id); 
//    res.json(post); 
//    //Pk = Primary Key
// });

// router.post("/", async (req, res) => {
//   const post = req.body;
//   await Posts.create(post);
//   res.json(post);
// });

// <----end of code used before mvc --> 

module.exports = router;
