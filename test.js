 var ffmpeg = require('fluent-ffmpeg');
//  ffmpeg -re -i "Introducing App Platform by DigitalOcean-iom_nhYQIYk.mkv" -c:v copy -c:a aac -ar 44100 -ac 1 -f flv rtmp://localhost/live/stream
 
  console.log("streaming to youtube")
  var inputURL ="public/183999361_533297410991031_2553004380145226348_n.mp4"
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
    .output('rtmp://localhost/live/stream', function(stdout, stderr) {
      console.log('Convert complete' +stdout)
    })
    .run()
