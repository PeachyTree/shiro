// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const leveling = require('discord-leveling');

class SetLevel extends Command {
  constructor(client) {
    super(client, {
      name: "set-level",
      description: 'Sets the specified level to a user or yourself.',
      category: "Profile",
      usage: "set-level [@USER_MENTION] <LEVEL_TO_SET>",
      permLevel: "Server Owner",
    });
  }

  async run(message, args) { 

    let amount = args[0];
    let user = message.mentions.users.first() || message.author;

    if (!amount.length || !user) {
      return message.reply("Command Usage: `set-level [@USER_MENTION] <LEVEL_TO_SET>`");
    }
 
    await leveling.SetLevel(user.id, amount);
    message.channel.send(`☑️ | ${user.username}, you now are level ${amount}!`);
  }
};

module.exports = SetLevel;