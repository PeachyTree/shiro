const Command = require('../../base/Command.js');

class Prefix extends Command {
  constructor(client) {
    super(client, {
      name: "prefix",
      description: "Returns the command prefix for the current server.",
      category: "Core",
      usage: "prefix",
      guildOnly: true
    });
  }

  async run(message, settings) { 
    message.channel.send(`My prefix here on ${message.guild.name} is "**${settings.prefix}**".\nTo change my prefix, do \`${settings.prefix}set edit prefix <New Prefix>\`.`);
  }
}

module.exports = Prefix;
