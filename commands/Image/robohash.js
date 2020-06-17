// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require("../../base/Command.js");
const fetch = require("node-fetch");

class Robohash extends Command {
  constructor(client) {
    super(client, {
      name: "robohash",
      description: "Generates a picture of a robot from some given text.",
      category: "Image",
      usage: "robohash <Text>",
      aliases: ["robot"]
    });
  }

  async run(message, args, level, settings) { 
    const query = args.join(" ");
    if (!query) return message.channel.send("Command Usage: `robohash <Text>`");
    if (query.match(/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/g)) return message.channel.send("Your query cannot include symbols.");

    message.channel.startTyping();

    fetch(`https://robohash.org/${encodeURIComponent(query)}.png`)
    .then(res => message.channel.send({ files: [{ attachment: res.body, name: `${query}.png` }] })
    .catch(error => {
      this.client.logger.error(error);
      message.channel.stopTyping(true);
      return message.channel.send(`An error occurred: ${error.message}`);
    }));

    message.channel.stopTyping(true);
  }
}

module.exports = Robohash;
