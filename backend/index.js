const express = require("express");
const app = express();
const cors = require('cors'); 
const bodyParser = require('body-parser');
const postRoutes = require('./routes/Posts');
const userRoutes = require('./routes/Users');
const path = require('path');


app.use(express.json());
app.use(cors()); 

const db = require("./models");

// Routers
// const postRouter = require("./routes/Posts");
// app.use("/posts", postRouter);
// const commentsRouter = require('./routes/Comments'); 
// app.use("/comments", commentsRouter);
// const usersRouter = require("./routes/Users");
// app.use("/auth", usersRouter);


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



app.use (bodyParser.json()); 
//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/posts', postRoutes);
app.use('/auth', userRoutes);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});

module.exports = app; 