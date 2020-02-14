const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");

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

// function for making sure the guild can be accessed. Currently crashes if the guild can't be accessed :)
function checkIfGuildIsAvailable(message) {
    if (message) {
        console.log('The guild is available.');
        return(true);
    } else {
        console.log('The guild is not a available.');
        return(false);
    }
}

async function getSong(songID, songDifficulty, score) {
  var url = 'https://beatsaver.com/api/maps/detail/' + songID;
  console.log('The songID is ' + songID);
  const response = await fetch(url).catch(console.error);
  const data = await response.json();
  console.log(data);
  var noteCount;
  console.log(typeof songDifficulty);

  switch (songDifficulty) {
    case '1':
      noteCount = data.metadata.characteristics[0].difficulties.easy.notes;
      console.log('getting easy info');
      break;

    case '2':
      noteCount = data.metadata.characteristics[0].difficulties.normal.notes;
      console.log('getting normal info');
      break;

    case '3':
      noteCount = data.metadata.characteristics[0].difficulties.hard.notes;
      console.log('getting hard info');
      break;

    case '4':
      noteCount = data.metadata.characteristics[0].difficulties.expert.notes;
      console.log('getting expert info');
      break;

    case '5':
      noteCount = data.metadata.characteristics[0].difficulties.expertPlus.notes;
      console.log('getting expert plus info');
      break;
  }

  console.log(noteCount)

  if (noteCount == null) {
    console.log('There are no notes on this difficulty!');
    // message.channel.send('There are no notes on this difficulty!');
    return(noteCount);

  } else if (noteCount < 13 && noteCount > 0) {
    console.log('There are less than 13 notes in this song.')
    // message.channel.send('Songs with less than 13 notes do not work at this time.')
    return(noteCount);

  } else {
    calculateAccuracy(noteCount, score);
  }
}

function calculateAccuracy(noteCount, score) {
  console.log('calculateAccuracy has recieved ' + noteCount + ' as the noteCount');
  console.log(score);

  var highestScorePossible = 920 * noteCount - 7245;
  var accuracy = score / highestScorePossible;
  console.log('Your accuracy is ' + accuracy);
}

client.on('message', message => {
    let args = message.content.split(" ");

    if (message.content === 'what is my avatar') {
        message.reply('the link to your avatar is ' + message.author.avatarURL);
    }

    if (message.content === 'dm me') {
        message.channel.send('Dm sent :smiley:')
        message.author.createDM();
        message.author.send('Hello ' + message.author.username + '. How is your day?');
        console.log('Dm sent to ' + message.author.username + '.');
    }

    switch(args[0]){
        case '=ping':
            message.channel.send('pong');
            break;

        case '=hi':
            message.channel.send('Hello ' + message.author.username + '!');
            break;

        case '=invite':
            if (message.channel.type == 'dm') {
                message.author.send("I can't do that here. :frowning2:");
                console.log('Invite not available in DMs.');
            } else {
                message.channel.createInvite({}, false, 0, 0, false)
                .then(invite => message.channel.send(`Your invite link is https://discord.gg/${invite.code}`))
                .catch(console.error);
                console.log('Invite link given to ' + message.author.username + '.');
            }
            break;

        case '=channeltype':
            message.channel.send(message.channel.type);
            break;

        case '=devin':
            message.channel.send(':poop:');
            break;

        case '=ryan':
            message.channel.send(':chocolate_bar: Yum, Ryan smells good.');
            break;

        case '=whereami':
            if (message.channel.type == 'dm') {
                message.author.send("I can't do that here. :frowning2:");
                console.log('WhereAmI not available in DMs.');
                break;
            } else if (checkIfGuildIsAvailable(!message.guild.available)) {
                message.author.send("I can't do that here. :frowning2:");
                console.log('WhereAmI not available here.');

            } else {
                message.channel.send(message.author.username + ', you are on the ' + message.guild.name + ' Discord Server.');
                break;
            }

        case '=info':
            if(args[1] == 'commands') {
                message.channel.send('Currently the only commands are "dm me", "what is my avatar", =ping, =hi, =invite, and =whereami.');
            } else {
                message.channel.send('I am the very cool bot. Do =info commands to see my commands.');
            }
        case '.acc':
            getSong(args[1], args[2], args[3]);
          // id, difficulty, score
          // easy - 1, normal - 2, hard - 3, expert - 4, expert plus - 5
          //  message.channel.send('Your accuracy is ' + accuracy + '%.')
        default:
            break;
    }

})

client.login(token);
