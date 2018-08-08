#!/usr/bin/env node

const lyridsServer = require('./lib/lyridsServer')
const readline = require('readline');
const broadcaster = require('./lib/broadcaster')
var colors = require('colors')

const readlineHandler = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity,
  terminal: true,
  historySize: 1
});

const destinationSucessCallback = (destinationData) => {
  readlineHandler.resume()

  readlineHandler.on('line', (singleLineString) => {
    broadcaster.sendMessage(singleLineString, destinationData)
    console.log(`${"\u21e2".gray}  ${singleLineString}`);
  });

}

const destinationFailCallback = () => {

  console.log('Lyrids exits without streaming!\n')
  process.exit(1)

}

readlineHandler.pause()
lyridsServer.getBroadcastDestination(destinationSucessCallback, destinationFailCallback)
