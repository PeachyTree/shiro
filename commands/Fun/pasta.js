const Command = require('../../base/Command.js');
const pasta = require('../../assets/json/pasta.json');

class Pasta extends Command {
  constructor(client) {
    super(client, {
      name: "pasta",
      description: "Cool custom, random pastas that I make!",
      category: "Fun",
      usage: "pasta",
    });
  }

  async run(message, args, level, settings) {
    return message.channel.send(pasta);
  }
};

module.exports = Pasta;