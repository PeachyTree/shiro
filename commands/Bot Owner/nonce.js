// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');

class Nonce extends Command {
  constructor(client) {
    super(client, {
      name: "nonce",
      description: "Sends a random number string used for checking message delivery.",
      category: "Bot Owner",
      usage: "c.nonce",
      permLevel: "Bot Owner"
    });
  }

  async run(message, args, level) { 
    try {
      const msg = await message.channel.send(message.nonce);
      msg.edit(`${message.nonce}\nDelivery time: **${msg.createdTimestamp - message.createdTimestamp}**ms.`);
    } catch (error) {
      this.client.logger.error(`Message delivery failed in guild "${message.guild.name}" (${message.guild.id}).`);
    }
  }
}

module.exports = Nonce;
