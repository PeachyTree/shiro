const Command = require('../../base/Command.js');

class Say extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      description: "Lets me say something for you. Useful for example to create rules or help pages.",
      category: "Text",
      usage: "say <Text>",
      aliases: ["echo"],
      permLevel: 'Moderator'
    });
  }

  async run(message, args) { 
    if (!args.length) {
      return message.reply("Command Usage: `say <Text>`")
    }
    
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
  }
}

module.exports = Say;