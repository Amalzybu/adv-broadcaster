# 
FROM node:alpine

WORKDIR /code

RUN apk add  --no-cache ffmpeg

RUN npm install -g nodemon

COPY . /code/

WORKDIR /code

RUN npm ci


# Serve the app
# CMD ["node", "server.js"]

