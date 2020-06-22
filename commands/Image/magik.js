const Command = require("../../base/Command.js");
const fetch = require("node-superfetch");

class Magik extends Command {
  constructor(client) {
    super(client, {
      name: "magik",
      description: "Adds a \"magik\" effect to the specified image.",
      category: "Image",
      usage: "magik <IMAGE_URL>"
    });
  }

  async run(message, args, level, settings) { 
    const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : null;
    if (!url || !url.startsWith("http")) return message.channel.send("Command Usage: `magik <IMAGE_URL>`");

    message.channel.startTyping();

    fetch(`https://nekobot.xyz/api/imagegen?type=magik&image=${url}`)
    .then(res => res.json())
    .then(data => {
      if (!data.success) return message.channel.send("An error occurred. Please ensure the URL you're providing is an image URL.");
      message.channel.stopTyping(true);
      return message.channel.send({ file: data.message });
    })
    .catch(error => {
      this.client.logger.error(error);
      message.channel.stopTyping(true);
      return message.channel.send(`An error occurred: ${error.message}`);
    });
  }
}

module.exports = Magik;
