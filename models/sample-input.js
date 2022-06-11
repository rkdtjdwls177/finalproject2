const mongoose = require('mongoose')
const User = require('./User')
const Lecture = require('./Lecture')
const LectVideo = require('./LectVideo')

mongoose.connect('mongodb://localhost:27017', {});

Lecture.create({
    writer: null,
    title: 'html5'
}, function(err, lecture){
    console.log(err, lecture)
})

Lecture.create({
    writer: null,
    title: 'css'
}, function(err, lecture){
    console.log(err, lecture)
})

Lecture.create({
    writer: null,
    title: 'javascript'
}, function(err, lecture){
    console.log(err, lecture)
})

Lecture.create({
    writer: null,
    title: 'jquer'
}, function(err, lecture){
    console.log(err, lecture)
})

Lecture.find({
    title:'html5'
}, function(err, lecture){
    LectVideo.create({
        lecture: lecture[0]._id,
        title: 'blossom',
        description: 'blossom',
        privacy: 0,
        filepath: '/video/blossom.mp4',
        thumbnail: '/video/thumbnail/blossom.jpg',
        category: null,
        views: 0,
        duration: null
    }, function(err, lectVideo){
        console.log(err, lectVideo)
    }
    )

    LectVideo.create({
        lecture: lecture[0]._id,
        title: 'bird',
        description: 'bird',
        privacy: 0,
        filepath: '/video/bird.mp4',
        thumbnail: '/video/thumbnail/bird.jpg',
        category: null,
        views: 0,
        duration: null
    }, function(err, lectVideo){
        console.log(err, lectVideo)
    }
    )

    LectVideo.create({
        lecture: lecture[0]._id,
        title: 'forest',
        description: 'forest',
        privacy: 0,
        filepath: '/video/forest.mp4',
        thumbnail: '/video/thumbnail/forest.jpg',
        category: null,
        views: 0,
        duration: null
    }, function(err, lectVideo){
        console.log(err, lectVideo)
    }
    )
})

Lecture.find({
    title: 'css'
},function(err, lecture){
    LectVideo.create({
        lecture: lecture[0]._id,
        title: 'sunrise',
        description: 'sunrise',
        privacy: 0,
        filepath: '/video/sunrise.mp4',
        thumbnail: '/video/thumbnail/sunrise.jpg',
        category: null,
        views: 0,
        duration: null
    }, function(err, lectVideo){
        console.log(err, lectVideo)
    }
    )

    LectVideo.create({
        lecture: lecture[0]._id,
        title: 'tree',
        description: 'tree',
        privacy: 0,
        filepath: '/video/tree.mp4',
        thumbnail: '/video/thumbnail/tree.jpg',
        category: null,
        views: 0,
        duration: null
    }, function(err, lectVideo){
        console.log(err, lectVideo)
    }
    )

    LectVideo.create({
        lecture: lecture[0]._id,
        title: 'waterfall',
        description: 'waterfall',
        privacy: 0,
        filepath: '/video/waterfall.mp4',
        thumbnail: '/video/thumbnail/waterfall.jpg',
        category: null,
        views: 0,
        duration: null
    }, function(err, lectVideo){
        console.log(err, lectVideo)
    }
    )
})