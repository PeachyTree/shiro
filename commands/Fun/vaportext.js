// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require("../../base/Command.js");

class Vaportext extends Command {
  constructor(client) {
    super(client, {
      name: "vaportext",
      description: "Make text **A E S T H E T I C**.",
      category: "Fun",
      usage: "vaportext <Text>",
      aliases: ["vapor", "vapour", "vapourtext"]
    });
  }

  async run(message, args, level) { 
    if (!args.length) return message.channel.send("Command Usage: `vaportext <Text>`");

    let msg = "";
    for (let i = 0; i < args.length; i++) {
      msg += args[i].toUpperCase().split("").join(" ") + "   ";
    }

    return message.channel.send(msg);
  }
}

module.exports = Vaportext;
