// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');

class Ship extends Command {
  constructor(client) {
    super(client, {
      name: "ship",
      description: "Combines two or more mentioned user's names.",
      category: "Fun",
      usage: "ship <@USER_MENTION1> <@USER_MENTION2>"
    });
  }

  run(message, args, level, settings) { 
    if (!args.length) {
      return message.react('🚫'), message.reply("Command Usage: `ship <@USER_MENTION1> <@USER_MENTION2>`")
    }

    let users = message.mentions.users.map(u => u.username);
    
    let shippedName = '';
    for (let i = 0; i < users.length; i++) {
      shippedName += `${users[i].substring(0, users[i].length / 2)}`;
    }
    
    message.channel.send(`${users.join(' + ')} = **${shippedName}**`); 
  }
}

module.exports = Ship;