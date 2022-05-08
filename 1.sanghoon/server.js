const express = require('express')
const url = require('url')
const fs = require('fs')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const ejs = require('ejs')
const mongoose = require('mongoose')

const app = express()
mongoose.connect('mongodb://localhost:27017/my_database', {useNewUrlParser : true})
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/pages'))
app.use(express.static(__dirname + '/video'))

app.listen(8000, function(){
    console.log('App listening')
})

app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname + '/pages/video.html'))
})

app.get('/video', function(req,res){
    const videoPath = "video/Blossoms - 113004.mp4";
    const videoSize = fs.statSync("video/Blossoms - 113004.mp4").size;
    const range = req.headers.range;
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    const videoStream = fs.createReadStream(videoPath, { start, end });

    if (!range) {
        res.status(400).send("Requires Range header");
    }

    res.writeHead(206, headers);
    videoStream.pipe(res);
})

// BlogPost.create({
//     title : '이건 제목2입니다.' ,
//     body : '이건 바디2입니다.'
// },function(error, blogpost){
//     console.log(error,blogpost)
// })

// BlogPost.find({},function(err,data){
//     console.log()
// })
