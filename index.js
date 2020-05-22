const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const https = require('https');

const token = 'NjU2MzA1ODM2MjA5MjA5MzQ3.Xfgusw.1NMtQ3P5WP6fz1slFzbz_DeDB8c';

client.on('ready', () => {
  // makes status "Listening to your Discord server"
    client.user.setPresence({
      game: {
          name: 'your Discord server',
          type: "LISTENING"
      }
    });
    console.log('The bot is online!');
})



client.on('message', message => {
    let args = message.content.split(" ");

    switch(args[0]){
        case '.acc':
            // myArray = getSong(args[1], args[2], args[3]);
            // console.log('here is the same array out of the funtion ' + myArray[0] + ' ' + myArray[1]);
            // calculateAccuracy(myArray[0], myArray[1]);
            // id, difficulty, score
            // easy - 1, normal - 2, hard - 3, expert - 4, expert plus - 5
            fetchBeatSaver(args[1]);
            message.channel.send('Your accuracy is ' + accuracy + '%.');
            break;
        default:
            break;
    }

})

var accuracy = 10;
var songJson;

function fetchBeatSaver(id) {
  let url = 'https://beatsaver.com/api/maps/detail/' + id;
  // songJson = loadJSON(url);
  // console.log(songJson);

  // fetch(url)
  // .then(function(res){
  //   return res.json();
  // })
  // .then(function(data){
  //   console.log(data);
  // });

  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    songJson = data;
    console.log(songJson);
    return(songJson);
  });
}


client.login(token);
