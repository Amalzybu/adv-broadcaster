
 const express = require('express')
 const app = express()
 var cors = require('cors')
 var path = require('path'); 
 var busboy = require('connect-busboy');
 var fs = require('fs-extra');
 var ffmpeg = require('fluent-ffmpeg');
 const ThumbnailGenerator = require('video-thumbnail-generator').default;
 
 
 app.use(busboy());
 app.use(express.static(path.join(__dirname, 'public')));
 
 
 var assert = require('assert');
 var async = require('async');
 
 var _ = require('lodash');

 const { PrismaClient } = require('@prisma/client')
 const prisma = new PrismaClient()
 require('dotenv').config()
 
 
 app.use(cors({ origin: '*'}));

 app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+"/public/dist", '/index.html'));
});

 app.route('/upload-video')
     .post(function (req, res, next) {
 
         var fstream;
         req.pipe(req.busboy);
         req.busboy.on('file', function (fieldname, file, filename) {
             console.log("Uploading: " +filename.filename);
             filename = filename.filename;
 
             //Path where image will be uploaded
             fstream = fs.createWriteStream(__dirname + '/public/' + filename);
             file.pipe(fstream);
             fstream.on('close',async function () {    
                 console.log("Upload Finished of " + filename);  
                 var datetime = new Date(); 
                 let r = (Math.random() + 1).toString(36).substring(7);           
  


                const tg = new ThumbnailGenerator({
                  sourcePath: 'public/'+filename,
                  thumbnailPath: 'public/thumbnail/',
                  tmpDir: 'public/thumbnail/' //only required if you can't write to /tmp/ and you need to generate gifs
                });

                tg.generateOneByPercentCb(90, async function(err, result){
                  console.log(typeof result);
                  const contents = "data:image/png;base64,"+await fs.readFile('public/thumbnail/'+result, {encoding: 'base64'});
                  const post = await prisma.post.create({
                    data: {
                      createdAt:datetime,
                      updatedAt:datetime,
                      title: filename,
                      content: contents,
                      published:true,
                      authorId:1
                    },
                  })

                  var inputURL ="public/"+filename
                  var proc3 = new ffmpeg({ source: inputURL})
                    .addOption('-c:v copy')
                    .addOption('-c:a aac')
                    .addOption('-ar', 44100)
                    .addOption('-ac', '1')
                    .addOption('-f', 'flv')
                    .on('start', function(commandLine) {
                    console.log('Query : ' + commandLine);
                    })
                    .on('error', function(err) {
                    console.log('Error: ' + err.message);
                    })
                    .on('end', function (err, stdout, stderr) {
                      console.log('Finished processing!' /*, err, stdout, stderr*/)
                    })
                    .output('rtmp://x.rtmp.youtube.com/live2/xukh-g1dv-pe36-xh5h-f5ys', function(stdout, stderr) {
                      console.log('Convert complete' +stdout)
                    })
                    .run()
                });
                // 
                 
                 
                 
                 
                 res.send('Hello World!')
             });
         });
     });
 

 
 
 
 exports.app = app;