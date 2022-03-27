/**
 *
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
 const express = require('express')
 const app = express()
 var cors = require('cors')
 var path = require('path'); 
 var busboy = require('connect-busboy');
 var fs = require('fs-extra');
 var ffmpeg = require('fluent-ffmpeg');
 const ThumbnailGenerator = require('video-thumbnail-generator').default;
 
 const port = 8888
 
 app.use(busboy());
 app.use(express.static(path.join(__dirname, 'public')));
 var PROTO_PATH = __dirname + '/helloworld.proto';
 
 var assert = require('assert');
 var async = require('async');
 
 var _ = require('lodash');
 var grpc = require('@grpc/grpc-js');
 var protoLoader = require('@grpc/proto-loader');
 const { PrismaClient } = require('@prisma/client')
 const prisma = new PrismaClient()
 require('dotenv').config()
 
 var packageDefinition = protoLoader.loadSync(
     PROTO_PATH,
     {keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
     });
 var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
 var helloworld = protoDescriptor.helloworld;
 
 /**
  * @param {!Object} call
  * @param {function():?} callback
  */
 function doSayHello(call, callback) {
   callback(null, {message: 'Hello! '+ call.request.name});
 }
 
 async function getFileNames(call, callback) {
 
 
   const allUsers = await prisma.post.findMany({
 
     select: {
  
       id:true,
       title:true,
       content:true
   
     },
   
   })
   
   // console.dir(allUsers, { depth: null })
   const notes = { items: allUsers}
 
 
   callback(null, notes);
 }
 
 function list(call, callback) {
     const notes = { notes: [
       { id: '1', title: 'Note 1', content: 'Content 1'},
       { id: '2', title: 'Note 2', content: 'Content 2'}
     ]
   }
   callback(null, notes)
 }
 
 
 /**
  * @param {!Object} call
  */
 function doSayRepeatHello(call) {
   var senders = [];
   function sender(name) {
     return (callback) => {
       call.write({
         message: 'Hey! ' + name
       });
       _.delay(callback, 500); // in ms
     };
   }
   for (var i = 0; i < call.request.count; i++) {
     senders[i] = sender(call.request.name + i);
   }
   async.series(senders, () => {
     call.end();
   });
 }
 
 /**
  * @return {!Object} gRPC server
  */
 function getServer() {
   var server = new grpc.Server();
   server.addService(helloworld.Greeter.service, {
     sayHello: doSayHello,
     sayRepeatHello: doSayRepeatHello,
     getItem:getFileNames,
   });
   return server;
 }
 
 if (require.main === module) {
  
   console.log(process.env.DB_NAME)
   var server = getServer();
   server.bindAsync(
     '0.0.0.0:9090', grpc.ServerCredentials.createInsecure(), (err, port) => {
       assert.ifError(err);
       server.start();
   });
 }
 
 //******************EXPRESS PART *************//
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
 
 app.listen(port, async function() {

   console.log(`${__dirname}gdfgdf Example app listening on port ${port}`)
   
   
 
   
 })
 
 
 
 exports.getServer = getServer;