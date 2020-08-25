const Command = require('../../base/Command.js');
const leveling = require('discord-leveling');

class AddEXP extends Command {
  constructor(client) {
    super(client, {
      name: "add-exp",
      description: 'Adds EXP to the mentioned user or yourself.',
      category: "Profile",
      usage: "add-exp [@USER_MENTION] <AMOUNT_TO_ADD>",
      permLevel: "Server Owner",
    });
  }

  async run(message, args) { 

    if (!args.length) {
      return message.reply("Command Usage: `add-exp [@USER_MENTION] <AMOUNT_TO_ADD>`");
    }

    let amount = args[0];
    let user = message.mentions.users.first() || message.author;
 
    await leveling.AddXp(user.id, amount)
    message.channel.send(`☑️ | ${user.username}, you now have ${amount} EXP!`);
  }
};

module.exports = AddEXP;