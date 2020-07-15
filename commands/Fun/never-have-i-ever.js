const Command = require('../../base/Command.js');
const request = require('node-superfetch');

class NeverHaveIEver extends Command {
  constructor(client) {
    super(client, {
      name: "never-have-i-ever",
      description: "Responds with a random 'Never Have I Ever...' statement.",
      category: "Fun",
      usage: "never-have-i-ever",
      aliases: ["never-have-i", "never-have", "never-ever"]
    });
  }

  async run(message) {
    try {
        const { text } = await request.get('http://www.neverhaveiever.org/randomtext.php');
        return message.channel.send(text.match(/<h1>(.+)<\/h1>/i)[1].replace(/<\/br>/g, ''));
    } catch (err) {
        return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = NeverHaveIEver;