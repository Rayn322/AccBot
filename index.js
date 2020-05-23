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
      console.log('message sent');
      console.log('accuracy at root ' + accuracy);
      break;
    default:
      break;
  }

})

var accRequest;
var accuracy = 10;
var result = 'Not calculated';
var songJson;

function fetchBeatSaver(id, difficulty, score) {
  let url = 'https://beatsaver.com/api/maps/detail/' + id;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      songJson = data;
      console.log('json aquired')
      console.log(songJson);
      return (getAcc(songJson, difficulty, score));
    });
};

function getAcc(songJson, difficulty, score) {
  console.log('getacc starts')
  switch (difficulty) {
    case '1':
      var noteCount = songJson.metadata.characteristics[0].difficulties.easy.notes;
      break;
    case '2':
      var noteCount = songJson.metadata.characteristics[0].difficulties.normal.notes;
      break;
    case '3':
      var noteCount = songJson.metadata.characteristics[0].difficulties.hard.notes;
      break;
    case '4':
      var noteCount = songJson.metadata.characteristics[0].difficulties.expert.notes;
      break;
    case '5':
      var noteCount = songJson.metadata.characteristics[0].difficulties.expertPlus.notes;
      break;
  };
  console.log(noteCount);

  if (noteCount == null) {
    console.log('There are no notes on this difficulty!');


  } else if (noteCount < 13 && noteCount > 0) {
    console.log('There are less than 13 notes in this song.')

  } else {
    var maxScore = 920 * noteCount - 7245;
    console.log('max score is ' + maxScore);
    console.log(maxScore)
    accuracy = parseInt(score) / maxScore * 100;
    console.log('accuracy is ' + accuracy);
    accRequest.channel.send('Your accuracy is ' + accuracy + '%');
    return (accuracy);
  }
};

client.login(token);
