# gRPC-Web Hello World Guide

This guide is intended to help you get started with gRPC-Web with a simple
Hello World example. For more information about the gRPC-Web project as a
whole, please visit the [main repo](https://github.com/grpc/grpc-web).

All the code for this example can be found in this current directory.

```sh
$ cd net/grpc/gateway/examples/helloworld
```
```sh
protoc -I=. helloworld.proto --js_out=import_style=commonjs:generated --grpc-web_out=import_style=commonjs,mode=grpcwebtext:generated
```
```sh
protoc -I=. helloworld.proto --js_out=import_style=commonjs,binary:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
```
```sh
protoc -I=. helloworld.proto   --js_out=import_style=commonjs,binary:./ad-broadcaster/src   --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./ad-broadcaster/src & cp helloworld.proto ./ad-broadcaster/src/helloworld.proto
```
```sh
docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro     --network=host envoyproxy/envoy:v1.20.0
```
```sh
npx webpack --entry ./client.js  --output-path ./grpc --output-filename index.js
```
