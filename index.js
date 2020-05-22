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

  switch (args[0]) {
    case '.acc':
      // id, difficulty, score
      // easy - 1, normal - 2, hard - 3, expert - 4, expert plus - 5
      if (getAcc(fetchBeatSaver(args[1]), args[2], args[3]) == 0) {
        message.channel.send("Error of some type. I haven't bothered telling which one so bug me to do that.");
      } else {
        message.channel.send('Your accuracy is ' + accuracy + '%');
      };
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
      return (songJson);
    });
};

function getAcc(songJson, difficulty, score) {
  switch (difficulty) {
    case '1':
      if (songJson.metadata.difficulties.easy) {
        var noteCount = songJson.metadata.characteristics[0].difficulties.easy.notes;
        break;
      } else {
        return 0;
        break;
      };
    case '2':
      if (songJson.metadata.difficulties.normal) {
        var noteCount = songJson.metadata.characteristics[0].difficulties.normal.notes;
        break;
      } else {
        return 0;
        break
      };
    case '3':
      if (songJson.metadata.difficulties.hard) {
        var noteCount = songJson.metadata.characteristics[0].difficulties.hard.notes;
        break;
      } else {
        return 0;
        break
      };
    case '4':
      if (songJson.metadata.difficulties.expert) {
        var noteCount = songJson.metadata.characteristics[0].difficulties.expert.notes;
        break;
      } else {
        return 0;
        break
      };
    case '5':
      if (songJson.metadata.difficulties.expertPlus) {
        var noteCount = songJson.metadata.characteristics[0].difficulties.expertPlus.notes;
        break;
      } else {
        return 0;
        break
      };
  };
  console.log(noteCount);
};

client.login(token);
