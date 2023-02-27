const request = require('request'); 
const dotenv = require('dotenv');
const morgan =require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');
dotenv.config({path : './config/config.env'});

connectDB();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=> res.send('hello user'));

const {messagesender,quotegenerator,imagegenerator,weatherfinder} = require('./api/helper');

var dayInMilliseconds = 1000 * 60 * 60 * 24;
setTimeout(async () => {
     const users = await User.find();
  for(let i=0;i<users.length;i++){
       const weather =  weatherfinder(users[i].phonenumber,users[i].latitude,users[i].longitude,quotegenerator,imagegenerator,messagesender);    
}
}, 60000);
setInterval(async ()=>{
  const users = await User.find();
  for(let i=0;i<users.length;i++){
       const weather =  weatherfinder(users[i].phonenumber,users[i].latitude,users[i].longitude,quotegenerator,imagegenerator,messagesender);    
}
},dayInMilliseconds);

app.post('/weather' , (req,res) =>{
     User.exists({phonenumber : req.body.phnnumber},(err,r)=>{ 
          if(err){console.log(err)} 
           else if(r == null){
          console.log("new user")
        const user = new User({latitude: req.body.latitude, longitude :req.body.longitude, phonenumber : req.body.phnnumber});
        let user1;
         user.save()
        .then(user => {user1 = user;
             res.status(200).send(user1);})
        .catch(err => console.log(err));
        }
     })
    
      
}) 

app.post('/manual',(req,res) =>{
     const weather =  weatherfinder(req.body.phnnumber,req.body.latitude,req.body.longitude,quotegenerator,imagegenerator,messagesender);
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));