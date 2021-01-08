const Command = require('../../base/Command.js');
const { SHIRO_INVITE_LINK } = process.env;

class Invite extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      description: "Generates an invite link, for adding Shiro to a server.",
      category: "Core",
      usage: "invite",
      aliases: ["add"]
    });
  }

  async run(message) { 
    message.channel.send(`🔗 | ${SHIRO_INVITE_LINK}`);
  }
}

module.exports = Invite;