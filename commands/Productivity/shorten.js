const Command = require('../../base/Command.js');
const shortener = require("isgd");

class Shorten extends Command {
  constructor(client) {
    super(client, {
      name: "shorten",
      description: "Shortens the specified link.",
      category: "Productivity",
      usage: "shorten <URL> [Custom Title]",
    });
  }

  async run(message, args) { 
    if (!args[0]) return message.reply('Command Usage: `shorten <URL> [Custom Title]`');
    if (!args[1]) {
      shortener.shorten(args[0], function(res) {
        if (res.startsWith("Error:")) return message.channel.send(`Invalid URL provided!`);
        message.channel.send(`🔗 | Your shortened link: **<${res}>**.`);
      });
    } else {
      shortener.custom(args[0], args[1], function(res) {
        if (res.startsWith("Error:")) return message.channel.send(`An error occurred:\n\```${res.slice(7)}\````);
        message.channel.send(`🔗 | Your shortened link: **<${res}>**.`);
      });
    }
  }
}

module.exports = Shorten;
