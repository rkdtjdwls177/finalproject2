const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const LectSchema = new Schema({  
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    }
  });



const Lect = mongoose.model('Lecture', LectSchema);
module.exports = Lect