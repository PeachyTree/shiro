const Command = require('../../base/Command.js');
const rightThere = require('../../assets/json/rightthere');

class RightThere extends Command {
  constructor(client) {
    super(client, {
      name: "rightthere",
      description: "Sends a random right there copypasta! May include NSFW language and elements or considered as spam.",
      category: "Random Response",
      usage: "rightthere",
      aliases: ["rthere"]
    });
  }

  async run(message) {
    return message.channel.send(`${rightThere[Math.round(Math.random() * (rightThere.length - 1))]}`);
  }
}

module.exports = RightThere;