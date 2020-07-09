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

client.on('message', message => {
  let args = message.content.split(" ");

  switch (args[0]) {
    case '=dm':
      message.channel.send('Dm sent :smiley:')
      message.author.createDM();
      message.author.send('Hello ' + message.author.username + '. How is your day?');
      console.log('Dm sent to ' + message.author.username + '.');
      break;

    case '=avatar':
      message.channel.send('the link to your avatar is ' + message.author.avatarURL);
      break;
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

    case '=whereami':
      if (message.channel.type == 'dm') {
        message.author.send("I can't do that here. :frowning2:");
        console.log('WhereAmI not available in DMs.');
        break;
      } else {
        message.channel.send(message.author.username + ', you are on the ' + message.guild.name + ' Discord Server.');
        break;
      }
      break;

    case '=info':
      if (args[1] == 'commands') {
        message.channel.send('Currently the only commands are "dm me", "what is my avatar", =ping, =hi, =invite, and =whereami.');
      } else {
        message.channel.send('I am the very cool bot. Do =info commands to see my commands.');
      }
      break;

    default:
      break;
  }

})

client.login(token);
