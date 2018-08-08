var http = require('http')
var colors = require('colors')

const getBroadcastDestination = async (sucessCallback, failCallback) => {

  return new Promise((resolve, reject) => {

    var options = {
      host: process.env.LYRIDS_DESTINATION_PROVIDER,
      path: '/api/v1/destination_provider',
      port: process.env.LYRIDS_DESTINATION_PROVIDER_PORT
    };

    requestHandler = function(response) {

      if (response.statusCode == 404) {
        console.log(`\nLyrids Client v${require('../package.json').version}\n`)
        console.log('\tConnecting server error'.red)
        console.log(`\tresponse status code ${response.statusCode}`.gray)
        console.log(`\tServer ${process.env.LYRIDS_DESTINATION_PROVIDER}:${process.env.LYRIDS_DESTINATION_PROVIDER_PORT}\n`.gray)
        failCallback()
      }

      var responseString = ''

      response.on('data', function (chunk) {
        responseString += chunk;
      });

      response.on('end', function () {
        var jsonObject = JSON.parse(responseString);
        sucessCallback({
          url: jsonObject.url,
          port: jsonObject.port
        });
      });

    }

    http.request(options, requestHandler).end()

  });
}

module.exports.getBroadcastDestination = getBroadcastDestination
