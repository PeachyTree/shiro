// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require("../../base/Command.js");
const fetch = require("node-fetch");

class Image extends Command {
  constructor(client) {
    super(client, {
      name: "image",
      description: "Returns a random image.",
      category: "Image",
      usage: "image [size (e.g. 1920x1080)]",
      aliases: ["randomimage", "random-image"]
    });
  }

  async run(message, args, level, settings) { 
    let size = args[0];
    if (!args[0]) size = "";

    message.channel.startTyping();

    fetch(`https://source.unsplash.com/random/${size}`)
    .then(res => message.channel.send({ files: [{ attachment: res.body, name: "image.jpg" }] })
    .catch(error => {
      this.client.logger.error(error);
      message.channel.stopTyping(true);
      return message.channel.send(`🚫 | An error occurred: ${error.message}`);
    }));

    message.channel.stopTyping(true);
  }
}

module.exports = Image;
