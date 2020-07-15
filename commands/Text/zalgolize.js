const Command = require('../../base/Command.js');
const zalgo = require('../../assets/json/zalgo');

class Zalgolize extends Command {
  constructor(client) {
    super(client, {
      name: "zalgolize",
      description: "Sends the same message that you had sent, but zalgolized.",
      category: "Text",
      usage: "zalgolize <Text>"
    });
  }

  async run(message, args) { 
    try {
      if (!args.length) {
        return message.reply("Command Usage: `zalgolize <Text>`")
      }

      let result = '';
      const text = args.join(' ');
      for (let i = 0; i < text.length; i++) {
        result += text[i];
        for (const chars of Object.values(zalgo)) {
          let count = Math.floor(Math.random() * 5);
          while (count--) result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      return message.channel.send(result);
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  };
}

module.exports = Zalgolize;