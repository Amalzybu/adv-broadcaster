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

 const {HelloRequest, RepeatHelloRequest,
  HelloReply} = require('./helloworld_pb.js');
const {GreeterClient} = require('./helloworld_grpc_web_pb.js');



// simple unary call
var request = new HelloRequest();
request.setName('World');// server streaming call

  var streamRequest = new RepeatHelloRequest();
  streamRequest.setName('World');
  streamRequest.setCount(5);
client = new GreeterClient('http://' + window.location.hostname + ':8080',
      null, null);
  // var stream = client.sayRepeatHello(streamRequest, {});

  // stream.on('error', (err) => {
  // console.log(`Unexpected stream error: code = ${err.code}` +
  //         `, message = "${err.message}"`);
  // });

  

    // Some data...

  class GrpcCall{

    constructor() {
      this.client = new GreeterClient('http://' + window.location.hostname + ':8080',
      null, null);

      }
    callTest(){
     
      this.client.sayHello(request, {}, (err, response) => {
        if (err) {
        console.log(`Unexpected error for sayHello: code = ${err.code}` +
                   `, message = "${err.message}"`);
        } else {
        console.log(response.getMessage());
        }
        });
    }

     getFiles(){

      return new Promise((resolve, reject) =>this.client.getItem(request, {}, (err, response) => {
        if (err) {
        console.log(`Unexpected error for sayHello: code = ${err.code}` +
                   `, message = "${err.message}"`);
                   return reject(err);
        } else {
        console.log(JSON.stringify(response.array[0]));
        resolve(response) 
        }
        }) )
      

      
    }

    getLists(){



      return new Promise((resolve, reject) =>this.client.list(request, {}, (err, response) => {
        if (err) {
        console.log(`Unexpected error for sayHello: code = ${err.code}` +
                   `, message = "${err.message}"`);
                   return reject(err);
        } else {
        console.log(JSON.stringify(response));
        resolve(response) 
        }
        }) )
  }

    getClient(){
      return this.client;
    }
  }

  window.GrpcCall =GrpcCall

  


