const Command = require("../../base/Command.js");
const request = require("node-superfetch");

class Image extends Command {
  constructor(client) {
    super(client, {
      name: "image",
      description: "Returns a random image.",
      category: "Random Image",
      usage: "image [size (e.g. 1920x1080)]",
      aliases: ["randomimage", "random-image"]
    });
  }

  async run(message, args) { 
    let size = args[0];
    if (!args[0]) size = "";

    const { body } = await request.get(`https://source.unsplash.com/random/${size}`);
    return message.channel.send({ files: [body.message] });
  }
}

module.exports = Image;
