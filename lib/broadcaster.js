let dgram = require('dgram')
let client = dgram.createSocket('udp4')

const sendMessage = (message, destinationData) => {
  client.send(message, destinationData.port, destinationData.url)
}

module.exports.sendMessage = sendMessage
