# 
FROM node:16.14.0-alpine

RUN mkdir /project

WORKDIR /project

COPY . /project/

WORKDIR /project

RUN npm install -g nodemon

RUN npm install -g webpack-cli

RUN npm install



ENV HOST=0.0.0.0
# CMD ["yarn", "run", "serve"]

