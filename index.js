#!/usr/bin/env node

// console.log(process.env.LYRIDS_URL)
// console.log(process.env.LYRIDS_PORT)

const readable = process.stdin
readable.resume();

readable.on('data', function(data) {
  process.stdout.write(`${data.length}`);
});


const handleEnd = _ => {console.log('Lyrids....done!')}

readable.on('end', handleEnd);

module.exports = {}
