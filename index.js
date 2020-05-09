require('dotenv').config()
const express = require('express')
      bodyParser=require('body-parser')
      cors      = require('cors');



const errorHandler = require('./handlers/error')

const authRoutes = require('./routes/auth');

const msgRoutes = require('./routes/messages');

const db = require("./models");
const { isLoggedIn , isAuthorized }  = require('./middleware/auth')


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use('/api/auth', authRoutes);
app.use('/api/user/:id/message',isLoggedIn,isAuthorized,msgRoutes);
app.get("/api/messages", isLoggedIn, async function(req, res, next) {
    try {
      let messages = await db.Messages.find()
        .sort({ createdAt: "desc" })
        .populate("user", {
          username: true,
          profileImageUrl: true
        });
      return res.status(200).json(messages);
    } catch (err) {
      return next(err);
    }
  });
app.use((req,res,next)=>{
    let err = new Error('Not Found')
    err.status =404;
    next(err);
})

app.use(errorHandler);


app.listen('3001',()=>{
    console.log('Server Is Running On Port 3001')
})