const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');

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
      accRequest = message;
      fetchBeatSaver(args[1], args[2], args[3]);
      break;
    default:
      break;
  }

})

var accRequest;
var accuracy = 10;
var songJson;
var result;

function fetchBeatSaver(id, difficulty, score) {
  let url = 'https://beatsaver.com/api/maps/detail/' + id;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      songJson = data;
      console.log('json aquired');
      getAcc(songJson, difficulty, score);
    });
};

function getAcc(songJson, difficulty, score) {
  console.log('getacc starts');
  switch (difficulty) {
    case '1':
      if (songJson.metadata.difficulties.easy) {
        var noteCount = songJson.metadata.characteristics[0].difficulties.easy.notes;
      } else {
        result = 0;
      };
      break;
    case '2':
      if (songJson.metadata.difficulties.normal) {
        var noteCount = songJson.metadata.characteristics[0].difficulties.normal.notes;
      } else {
        result = 0;
      };
      break;
    case '3':
      if (songJson.metadata.difficulties.hard) {
        var noteCount = songJson.metadata.characteristics[0].difficulties.hard.notes;
      } else {
        result = 0;
      };
      break;
    case '4':
      if (songJson.metadata.difficulties.expert) {
        var noteCount = songJson.metadata.characteristics[0].difficulties.expert.notes;
      } else {
        result = 0;
      };
      break;
    case '5':
      if (songJson.metadata.difficulties.expertPlus) {
        var noteCount = songJson.metadata.characteristics[0].difficulties.expertPlus.notes;
      } else {
        result = 0;
      };
      break;
  };
  console.log(noteCount);

  if (result == 0) {
    console.log('There are no notes on this difficulty!');

  } else if (noteCount < 13 && noteCount > 0) {
    console.log('There are less than 13 notes in this song.');
    result = 1;
  } else {
    result = 2;
  };

  switch (result) {
    case 0:
      accRequest.channel.send("That difficulty has no notes or doesn't exist.");
      result = 'None';
      break;
    case 1:
      accRequest.channel.send("We currently don't support songs with less than 13 notes.");
      result = 'None';
      break;
    case 2:
      var maxScore = 920 * noteCount - 7245;
      console.log('max score is ' + maxScore);
      console.log(maxScore)
      accuracy = parseInt(score) / maxScore * 100;
      console.log('accuracy is ' + accuracy);
      accRequest.channel.send('Your accuracy is ' + accuracy + '%.');
      result = 'None';
      break;
    default:
      break;
  };
};

client.login(token);
