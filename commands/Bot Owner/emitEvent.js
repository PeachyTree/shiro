// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');

class EmitEvent extends Command {
  constructor(client) {
    super(client, {
      name: "emitEvent",
      description: "Emits an event.",
      category: "Bot Owner",
      usage: "c.emitEvent",
      aliases: ["emit"],
      permLevel: "Bot Owner",
      guildOnly: true
    });
  }

  async run(message, args, level) { 
    const member = message.mentions.members.first() || message.member;

    await this.client.emit("guildMemberAdd", member);
  }
}

module.exports = EmitEvent;