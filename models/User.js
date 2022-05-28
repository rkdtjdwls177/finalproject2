const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
 
const UserSchema = new Schema({  
    username: { // pass in config object. and put in validation rules 
      type: String,
      required: true,
      unique: true 
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },  
    otp: {
      type: String,
      required: false,
    },
    ip: {
      type: String,
      required: false,
    },
  });


// note: no lambda func! (not work!)
// UserSchema.pre('save', function(next){
//     const user = this      
//     bcrypt.hash(user.password, 10,  (error, hash) => {        
//       user.password = hash 
//       next() 
//     }); 
// });

const User = mongoose.model('User',UserSchema);
module.exports = User