const Command = require('../Command');

class GenerateInvite extends Command {
  constructor(client) {
    super(client, {
      name: "generate-invite",
      description: "Generates an invite link of the current text channel of your Discord server.",
      category: "Productivity",
      usage: "generate-invite [<NO_OF_USES>] [<INVITE_LINK_TIMEOUT_IN_MINUTES>]"
    });
  }

  async run(message, args) { 
    try {
      let uses = args[0]
      let age = args[1]

      let invite = await message.channel.createInvite({
        maxAge: age * 60,
        maxUses: uses 
      });

      await message.channel.send('Hiya.\n'
        + 'If you wanna invite friends to this server, share the following invite'
        + ' link with your friends.\n' +
        `https://discord.gg/${invite.code}`);
      } catch (err) {
        return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
      }
  };
}

module.exports = GenerateInvite;