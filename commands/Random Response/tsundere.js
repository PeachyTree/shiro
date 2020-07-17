const Command = require('../../base/Command.js');
const tsun = require('../../assets/json/tsundere');

class Tsundere extends Command {
  constructor(client) {
    super(client, {
      name: "tsundere",
      description: "Get a random tsundere quote!",
      category: "Random Response",
      usage: "tsundere",
    });
  }

  async run(message) {
    return message.channel.send(tsun[Math.round(Math.random() * (tsun.length - 1))]);
  }
}

module.exports = Tsundere;