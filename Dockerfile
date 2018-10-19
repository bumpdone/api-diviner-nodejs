FROM node:10.11.0-alpine
RUN apk update && apk upgrade && apk add --no-cache bash git openssh python make g++
# RUN git clone https://github.com/XYOracleNetwork/api-diviner-nodejs.git
RUN mkdir api-diviner-nodejs 
WORKDIR /api-diviner-nodejs
COPY package.json package.json

COPY graphql graphql
COPY package-lock.json package-lock.json
COPY src src
COPY bin bin
COPY tsconfig.build.json tsconfig.build.json
COPY tslint.json tslint.json
COPY tsconfig.base.json tsconfig.base.json
COPY tsconfig.json tsconfig.json

RUN npm install --production=false
RUN npm run build
RUN rm -r node_modules
RUN npm install --production=true

EXPOSE 12002/tcp

CMD node bin/xyo-diviner.js start