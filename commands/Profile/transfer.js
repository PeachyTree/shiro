const Command = require('../../base/Command.js');
const db = require('quick.db')

class Transfer extends Command {
    constructor(client) {
      super(client, {
        name: "transfer",
        description: "Transfer Gems to your friends!",
        category: "Profile",
        usage: "transfer <@USER_MENTION> <AMOUNT_TO_TRANSFER>",
        aliases: ["give", "give-user", "transfer-gems"]
      });
    }
  
    async run(message, args) { 
        try {
            let user = message.mentions.members.first() 

            let member = await db.get(`gems_${message.author.id}`)

            if (!user || !args[1]) {
                return message.reply('Command Usage: `transfer <@USER_MENTION> <AMOUNT_TO_TRANSFER>`')
            }

            if (message.content.includes('-')) { 
                return message.channel.send('That\'s not possible!')
            }

            if (member < args[1]) {
                return message.channel.send(`The amount of Gems you wanted to transfer was above the amount of Gems you own. Please try again with a valid amount.`)
            }

            message.reply(`you successfully transfered ${args[1]} Gems to ${user.username}!`)
            db.add(`gems_${user.id}`, args[1]) 
            db.subtract(`gems_${user.author.id}`, args[1])
        } catch (err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
        }
    }
}

module.exports = Transfer;