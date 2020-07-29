const Command = require("../../base/Command.js");

class PermissionLevel extends Command {
  constructor(client) {
    super(client, {
      name: "permission-level",
      description: "Displays your permission level for your location.",
      category: "Info",
      usage: "permission-level",
      guildOnly: true
    });
  }

  async run(message, level) {
    const friendly = this.client.config.permLevels.find(l => l.level === level).name;
    message.reply(`Your current Permission Level is: **${level}** (${friendly}).`);
  }
}

module.exports = PermissionLevel;
