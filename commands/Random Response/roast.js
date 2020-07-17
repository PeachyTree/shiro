const Command = require('../../base/Command.js');
const roasts = require('../../assets/json/roast');

class Roast extends Command {
  constructor(client) {
    super(client, {
      name: "roast",
      description: "Roasts a user.",
      category: "Random Response",
      usage: "roast [@USER_MENTION]"
    });
  }

  async run(message) {
    const user = message.mentions.users.first() || message.author;
    return message.channel.send(`${user.username}, ${roasts[Math.floor(Math.random() * roasts.length)]}`);
  }
}

module.exports = Roast;