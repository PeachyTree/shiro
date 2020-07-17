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
    try {
      if (!args.length) {
        return message.reply("Command Usage: `say <Text>`")
      }
      
      let botmessage = args.join(" ");
      message.delete().catch();
      message.channel.send(botmessage);
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Say;