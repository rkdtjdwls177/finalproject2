const mongoose = require('mongoose')
const path = require('path');
const Lecture = require('../models/Lecture')
const LectVideo = require('../models/LectVideo')

mongoose.connect('mongodb://localhost:27017', {});

module.exports = async(req, res) =>{
    const lecture = await Lecture.find({})
    const lectVideo = await LectVideo.find({})
    res.render('lecturehome', {
        lecture,
        lectVideo
    });
}