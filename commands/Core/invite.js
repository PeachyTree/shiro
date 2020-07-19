const Command = require('../../base/Command.js');
const { CELESTIA_INVITE_LINK } = process.env;

class Invite extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      description: "Generates an invite link, for adding Celestia to a server.",
      category: "Core",
      usage: "invite",
      aliases: ["add"]
    });
  }

  async run(message) { 
    message.channel.send(`🔗 | ${CELESTIA_INVITE_LINK}`);
  }
}

module.exports = Invite;