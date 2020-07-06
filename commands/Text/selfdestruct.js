const Command = require('../../base/Command.js');
const ms = require('ms');

class SelfDestruct extends Command {
  constructor(client) {
    super(client, {
      name: "selfdestruct",
      description: "Sends the same message that you had sent, but it will get auto deleted after a specific amount of time.",
      category: "Text",
      usage: "selfdestruct <Time (sec)> <Text>",
      aliases: ['destruct']
    });
  }
  
  async run(message, args) {

    let time = args[0];

    if (!args.length) {
      return message.reply("Command Usage: `selfdestruct <Time (sec)> <Text>`")
    }

    let text = args.slice(1).join(" "); 
    
    message.delete();
    let destructMsg = message.channel.send(`${text}`); 

    setTimeout(function() {
      message.delete(`${destructMsg}`);
    }, ms(time));
  }
} 

module.exports = SelfDestruct;