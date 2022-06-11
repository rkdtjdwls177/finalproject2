const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const LectVideoSchema = new Schema({  
    lecture: {
        type: Schema.Types.ObjectId,
        ref: 'Lecture'
    },
    title: { 
      type: String,
      maxlength: 50
    },
    description: {
        type: String
    },
    privacy: {
        type: Number
    },
    filepath: {
        type: String
    },
    thumbnail: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    }
  }, {timestamps: true});



const LectVideo = mongoose.model('LectVideo', LectVideoSchema);
module.exports = LectVideo