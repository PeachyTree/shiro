const Command = require('../../base/Command.js');

class NSFWCommands extends Command {
  constructor(client) {
    super(client, {
      name: "nsfwcommands",
      description: "Returns the github link for a list of NSFW commands.",
      category: "NSFW",
      usage: "nsfwcommands"
    });
  }

  async run(message) {
    return message.channel.send('https://github.com/AzuraApple/celestia/tree/master/commands/nsfw')
  }
}

module.exports = NSFWCommands;
