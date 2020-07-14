const Command = require('../../base/Command.js');

class Restart extends Command {
  constructor(client) {
    super(client, {
      name: "restart",
      description: "If running under PM2, the bot will restart.",
      category: "Bot Owner",
      usage: "restart",
      permLevel: "Bot Owner"
    });
  }

  async run(message) { 
    try {
      await message.channel.send("🔄 | Restarting, please wait...");
      this.client.commands.forEach(async cmd => {
        await this.client.unloadCommand(cmd);
      });
      process.exit(1);
    } catch (e) {
      this.client.logger.error(e);
    }
  }
}

module.exports = Restart;