FROM node:10.11.0-alpine
RUN apk update && apk upgrade && apk add --no-cache bash git openssh python make g++
RUN git clone https://github.com/bumpdone/api-diviner-nodejs.git
WORKDIR /api-diviner-nodejs
RUN npm install --production=false
RUN npm run build
