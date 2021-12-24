const http = require('http');
const express = require("express");
const app = express('./app');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const postRoutes = require('./routes/Posts');
const userRoutes = require('./routes/Users');
const commentRoutes = require('./routes/Comments');
const path = require('path');


app.use(express.json());
app.use(cors()); 

const db = require("./models/index");

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});


app.use (bodyParser.json()); 

app.use('/posts', postRoutes);
app.use('/auth', userRoutes);
app.use('/comments', commentRoutes); 

app.get("/", (req, res) => {
  res.json({ message: "Hello API." });
});


module.exports = app; 