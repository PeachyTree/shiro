// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');

class Leave extends Command {
    constructor(client) {
      super(client, {
        name: "leave",
        description: "Leaves the current server.",
        category: "Bot Owner",
        usage: "c.leave",
        guildOnly: true,
        permLevel: "Bot Owner" 
      });
    }

    async run(message, args, level, settings) { 
        if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);

        message.reply("Are you sure you want me to leave this guild? I can only be added back by users with the `MANAGE_GUILD` (Manage Server) permission. **(Y/N)**");

        return message.channel.awaitMessages(m => m.author.id === message.author.id, {
            "errors": ["time"],
            "max": 1,
            time: 20000
        }).then(resp => {
            if (!resp) return message.channel.send("Timed out.");
            resp = resp.array()[0];
            const validAnswers = [
                "Y",
                "N",
                "y",
                "n"
            ];
            if (validAnswers.includes(resp.content)) {
                if (resp.content === "N" || resp.content === "n") {
                    return message.channel.send("Yay, looks like I won't be leaving. :D");
                } else if (resp.content === "Y" || resp.content === "y") {
                    message.guild.leave()
                    .then(g => this.client.logger.info(`☑️ | Left guild via command: ${g}`))
                    .catch(e => {
                        this.client.logger.error(e);
                        returnmessage.channel.send(`🚫 | I tried to leave, but couldn't. An error occurred:\n\```${e.message}\````);
                    });
                }
            }
        });
    }
}

module.exports = Leave;