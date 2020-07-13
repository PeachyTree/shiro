const Command = require('../../base/Command.js');
const kaomojis = require('../../assets/json/kaomoji')

class Kaomoji extends Command {
  constructor(client) {
    super(client, {
      name: "kaomoji",
      description: "Displays a random kaomoji! (´・ω・｀) 3000 will definitely be enough to keep you busy! (ｖ｀▽´)ｖ",
      category: "Fun",
      usage: "kaomojo",
      aliases: ["emoticon"]
    });
  }

  async run(message) {
    let face = kaomojis[Math.round(Math.random() * (face.length - 1))];
    return message.channel.send(face);
  }
}

module.exports = Kaomoji;