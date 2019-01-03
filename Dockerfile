FROM mhart/alpine-node:10.15
RUN apk update && apk upgrade && apk add --no-cache bash git openssh python make g++
RUN yarn global add @xyo-network/app-diviner
RUN mkdir workspace
WORKDIR /workspace
EXPOSE 12000/tcp

CMD xyo-diviner