const Command = require('../../base/Command.js');
const leveling = require('discord-leveling');

class Delete extends Command {
  constructor(client) {
    super(client, {
      name: "delete",
      description: 'Removes a user from the database for leveling.',
      category: "Bot Owner",
      usage: "delete <@USER_MENTION>",
      permLevel: "Bot Owner",
    });
  }

  async run(message) { 

    let user = message.mentions.users.first();
    if (!user) {
      return message.reply("Command Usage: `delete <@USER_MENTION>`");
    }
 
    let output = await leveling.Delete(user.id);
    if (output.deleted == true) return message.channel.send('☑️ | Succesfully deleted the user out of the database!');
 
    message.channel.send('Could not find that user in database.');
  }
};

module.exports = Delete;