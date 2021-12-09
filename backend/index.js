const express = require("express");
const app = express();
const cors = require('cors'); 
const bodyParser = require('body-parser');
const postRoutes = require('./routes/Posts');
const userRoutes = require('./routes/Users');
const commentRoutes = require('./routes/Comments');
const path = require('path');


app.use(express.json());
app.use(cors()); 

const db = require("./models");



 app.use (bodyParser.json()); 

app.use('/posts', postRoutes);
app.use('/auth', userRoutes);
app.use('/comments', commentRoutes); 

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});

module.exports = app; 