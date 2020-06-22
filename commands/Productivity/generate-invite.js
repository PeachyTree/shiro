const Command = require('../../base/Command.js');

class GenerateInvite extends Command {
  constructor(client) {
    super(client, {
      name: "generate-invite",
      description: "Generates an invite link of the current text channel of your Discord server.",
      category: "Productivity",
      usage: "generate-invite [<NO_OF_USES>] [<INVITE_LINK_TIMEOUT_IN_MINUTES>]"
    });
  }

  async run(message, args, level, settings) { 

    let uses = args[0]
    let age = args[1]

    let invite = await message.channel.createInvite({
      maxAge: age * 60,
      maxUses: uses 
    });

    await message.channel.send('Hiya.\n'
      + 'If you wanna invite friends to this server, share the following invite'
      + ' link with your friends.\n<3\n' +
      `https://discord.gg/${invite.code}`);
  };
}

module.exports = GenerateInvite;