const Command = require('../../base/Command.js');

class Status extends Command {
  constructor(client) {
    super(client, {
      name: "status",
      description: "Sets Celestia's presence/status.",
      category: "Bot Owner",
      usage: "status <online | idle | dnd | invisible>",
      permLevel: "Bot Owner"
    });
  }

  async run(message, args) { 
    const status = args[0];
    if (!status) return message.reply("A status type must be provided.");

    const statusType = args[0].toLowerCase();

    if (statusType === "online" || statusType === "idle" || statusType === "dnd" || statusType === "invisible") {
      this.client.user.setStatus(status);
      message.channel.send(`☑️ | Status successfully changed to **${statusType}**.\nPlease note that initially changing status may take up to a minute or two.`);
    } else {
      return message.channel.send(`"${statusType}" is not a valid status type.`);
    }
  }
}

module.exports = Status;