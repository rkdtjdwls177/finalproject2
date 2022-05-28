const User = require('../models/User')

module.exports = (req, res) =>{
    const { otp } = req.body;

    User.findOne({otp:otp}, (error,otp) => {      
      if (otp){                                  
            res.redirect('/')
            }
          else{
            res.redirect('/auth/register')
          };
    })
}