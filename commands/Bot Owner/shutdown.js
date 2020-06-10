// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');

class Shutdown extends Command {
  constructor(client) {
    super(client, {
      name: "shutdown",
      description: "Shuts down Celestia.",
      category: "Bot Owner",
      usage: "shutdown",
      permLevel: "Bot Owner"
    });
  }

  async run(message, args, level) { 
    try {
      await message.channel.send(":wave: | Shutting down...");
      this.client.commands.forEach(async cmd => {
        await this.client.unloadCommand(cmd);
      });
      process.exit(0);
    } catch (e) {
      this.client.logger.error(e);
    }
  }
}

module.exports = Shutdown;