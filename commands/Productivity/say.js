// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');

class Say extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      description: "Lets me say something for you. Useful for example to create rules or help pages.",
      category: "Productivity",
      usage: "say <Text>",
      aliases: ["echo"],
      permLevel: 'Moderator'
    });
  }

  async run(message, args, level, settings) { 
    if (!args.length) {
      return message.reply("Command Usage: `say <Text>`")
    }
    
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
  }
}

module.exports = Say;