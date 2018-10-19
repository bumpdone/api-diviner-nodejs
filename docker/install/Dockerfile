FROM node:10.11.0-alpine
RUN apk update && apk upgrade && apk add --no-cache bash git openssh python make g++ sudo
RUN sudo npm install @xyo-network/api-diviner-nodejs -g --unsafe-perm=true

EXPOSE 12002/tcp

CMD xyo-diviner start -g 12002