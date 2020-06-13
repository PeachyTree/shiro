// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const db = require('quick.db')

class Transfer extends Command {
    constructor(client) {
      super(client, {
        name: "transfer",
        description: "Transfer Money to your friends!",
        category: "Economy",
        usage: "transfer <@USER_MENTION> <AMOUNT_TO_TRANSFER>",
        aliases: ["give", "give-user", "transfer-user"]
      });
    }
  
    async run(message, args, level, settings) { 

        let user = message.mentions.members.first() 

        let member = await db.get(`money_${message.author.id}`)

        if (!user || !args[1]) {
            return message.react('🚫'), message.reply('Command Usage: `transfer <@USER_MENTION> <AMOUNT_TO_TRANSFER>`')
        }

        if (message.content.includes('-')) { 
            return message.channel.send('That\'s not possible!')
        }

        if (member < args[1]) {
            return message.channel.send(`The amount you wanted to transfer was above the amount of Money you own. Please try again with a valid amount.`)
        }

        message.reply(`you successfully transfered ${args[1]} to ${user.username}!`)
        db.add(`money_${user.id}`, args[1]) 
        db.subtract(`money_${user.author.id}`, args[1])
    }
}

module.exports = Transfer;