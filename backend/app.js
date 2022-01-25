const express = require("express");

const helmet = require("helmet");
const cors = require("cors"); 

const postRoutes = require('./routes/Posts');
const userRoutes = require('./routes/Users');
const commentRoutes = require('./routes/Comments');
const auth = require('./middlewares/auth'); 
//const likeRoutes = require('./routes/Likes'); 
//const signalRoutes = require('./routes/Signalements')
const path = require('path');
const bodyParser = require("body-parser");

const app = express();
app.use(cors()); 
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use('/images', express.static('./images'));

app.use('/posts', postRoutes);
app.use('/auth', userRoutes);
app.use('/comments', commentRoutes); 
//app.use('/likes', likeRoutes); 
//app.use('/signal', signalRoutes); 

module.exports = app; 