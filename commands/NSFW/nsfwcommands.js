const Command = require('../Command');

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
    return message.channel.send('https://github.com/Shinmercy/shiro/tree/master/commands/NSFW')
  }
}

module.exports = NSFWCommands;
