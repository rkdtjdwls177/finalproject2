const bcrypt = require('bcrypt')
const { encrypt, compare } = require('../services/crypto');
const User = require('../models/User');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');


module.exports = (req, res) =>{
    const { username, password, user, admin } = req.body;
    User.findOne({username:username}, (error,user) => {      
      if (user){      
        bcrypt.compare(password, user.password, (error,same) =>{  
          if(same){ 
            mongoose.connect('mongodb://localhost:27017', {});
            const db = mongoose.connection
            db.once('open', () => {})
            db.collection("sessions").find().toArray(function (error,sessions) 
             { 
              for(var i in sessions)
              {
               var test=JSON.parse(sessions[i].session);  
              if(test){  
              if(test.username==username)
              {
                console.log(test.username) ; 
                const sessionStore = MongoStore.create({mongoUrl:'mongodb://localhost:27017'});
                sessionStore.destroy(sessions[i]._id)
              }
            }
              }
            }
          )
          req.session.userId=user._id 
          req.session.username=username

            if(admin=="on")
            {res.redirect('/auth/course')}  
            else         
            res.redirect('/')
            }
          else{
            res.redirect('/auth/login')  
          }
        })
      }
      else{
        res.redirect('/auth/login')
        
      }
    })
}
  