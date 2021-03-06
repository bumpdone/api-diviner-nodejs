[logo]: https://www.xy.company/img/home/logo_xy.png

![logo]

# DIVINER API (api-diviner-nodejs)

## Branches

### Master

[![Build Status](https://travis-ci.com/XYOracleNetwork/api-diviner-nodejs.svg?token=A85R2pDnngMDyWoqeLUG&branch=master)](https://travis-ci.com/XYOracleNetwork/api-diviner-nodejs)
[![BCH compliance](https://bettercodehub.com/edge/badge/XYOracleNetwork/api-diviner-nodejs?branch=master&token=3dd15a749bfd967c47acceb9e537294bc39579b5)](https://bettercodehub.com/results/XYOracleNetwork/api-diviner-nodejs)
[![Maintainability](https://api.codeclimate.com/v1/badges/f6bc63330b1d2422973b/maintainability)](https://codeclimate.com/github/XYOracleNetwork/api-diviner-nodejs/maintainability)
[![Greenkeeper badge](https://badges.greenkeeper.io/XYOracleNetwork/api-diviner-nodejs.svg)](https://greenkeeper.io/)

### Develop

[![Build Status](https://travis-ci.com/XYOracleNetwork/api-diviner-nodejs.svg?token=A85R2pDnngMDyWoqeLUG&branch=develop)](https://travis-ci.com/XYOracleNetwork/api-diviner-nodejs)
[![BCH compliance](https://bettercodehub.com/edge/badge/XYOracleNetwork/api-diviner-nodejs?branch=develop&token=3dd15a749bfd967c47acceb9e537294bc39579b5)](https://bettercodehub.com/results/XYOracleNetwork/api-diviner-nodejs)
[![Greenkeeper badge](https://badges.greenkeeper.io/XYOracleNetwork/api-diviner-nodejs.svg)](https://greenkeeper.io/)

## Description

The main API for accessing a diviner on the XYO network information using GraphQL.

## User Mode

### Requirements (Step 1)

Install Node 10.x or later from: [NodeJs](https://nodejs.org/en/download/current/)

### Install Diviner (Step 2)

```bash
sudo npm install @xyo-network/api-diviner-nodejs -g --unsafe-perm=true
```

### Build Diviner (Step 3)

```bash
xyo-diviner start
```

## Developer Mode

### Requirements (Step 1)

Install Node 10.x or later from: [NodeJs](https://nodejs.org/en/download/current/)

### Install Diviner (Step 2)

```bash
npm install https://github.com/XYOracleNetwork/api-diviner-nodejs
```

### Build Diviner (Step 3)

```bash
npm run build
```

### Start Diviner (Step 4)

```bash
npm run start
```

## Docker

### Install

Install the Diviner in a Docker and start the server at the end.

Note: There currently are quite a few build errors/warnings generted from dependencies that can safely be ignored, but should addressed in the future.

```none
docker image build -t xyonetwork-api-diviner-nodejs-install:latest https://raw.githubusercontent.com/XYOracleNetwork/api-diviner-nodejs/master/docker/install/Dockerfile
```

```none
docker run -p 12002:12002 xyonetwork-api-diviner-nodejs-install:latest
```

## Accessing GraphQL

### Example Query

GraphQL Query

```graphql
query QuestionHasIntersected($partyOneAddresses: [String]!, $partyTwoAddresses: [String]!, $markers: [String], $direction: Direction) {
  questionHasIntersected(partyOneAddresses: $partyOneAddresses, partyTwoAddresses: $partyTwoAddresses, markers: $markers, direction: $direction)
}
```

partyOneAddresses - the first of two entities in the query

partyTwoAddresses - the second of two entities in the query

markers - a list of known interactions between the two entities used for truncating

direction - truncate everything before or after the markers

Notes:

1. Addresses are public keys from the entities.
2. Markers are signed hashes from bound witness interactions.
3. Direction can be FORWARD, BACKWARD, or BOTH (default=BOTH)

Query Variables (replace the addresses with known addresses and markers)

```json
{
  "partyOneAddresses": ["040135DC4E51B3A3AC55F5A88D22DDAD498FDE02273BD0DF6FC63D5138EB8C128CF4268A6ED86A1DC433E0D3EFD24172CD1253EAFEFF71C9B6C133B7D759BFFE7E95"],
  "partyTwoAddresses": ["0401FF4FD5F39558F82E53111993D632756FBB9E5FAF85C0316DA8465F6B8B0F0BD1EC61D9C56EBBDF31C14F125964279F1996623995CCC1E30ACDF4A42E002620D4"],
  "markers": ["030524007069b9aa23dfa7b86e729aff39f976027dacd292588b70c93d9b53cfc15d"],
  "direction": "FORWARD"
}
```

## Command Line

### Usage

```none
  xyo-diviner <cmd> [opt]

  <cmd>: commands
  [opt]: options
```

### Commands

```none
  start               Start the Api Server
```

### Options

```none
  -g, --graphql [n]   The http port to listen on for graphql connections
                      (default = 12001)

  -a, --archivist [s] The url of the seed archivists to contact
                      (default = http://archivists.xyo.network:11001)
```

### Example: Start the Diviner on port 9070 and use port 9079 on your local computer for the archivist

```none
  xyo-diviner start -g 9070 -a http://localhost:9079
```

## License

Only for internal XY Company use at this time

## Credits

<p align="center">Made with  ❤️  by [<b>XY - The Persistent Company</b>] (https://xy.company)</p>
