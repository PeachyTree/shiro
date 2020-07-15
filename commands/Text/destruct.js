const Command = require('../../base/Command.js');
const ms = require('ms');

class Destruct extends Command {
  constructor(client) {
    super(client, {
      name: "destruct",
      description: "Sends the same message that you had sent, but it will get auto deleted after a specific amount of time.",
      category: "Text",
      usage: "destruct <Time (sec)> <Text>",
      aliases: ['self-destruct']
    });
  }
  
  async run(message, args) {
    try {
      let time = args[0];

      if (!args.length) {
        return message.reply("Command Usage: `destruct <Time (sec)> <Text>`")
      }

      let text = args.slice(1).join(" "); 
      
      message.delete();
      let destructMsg = message.channel.send(`${text}`); 

      setTimeout(function() {
        message.delete(`${destructMsg}`);
      }, ms(time));
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
} 

module.exports = Destruct;