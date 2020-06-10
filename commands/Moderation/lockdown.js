// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const ms = require("ms");

class Lockdown extends Command {
    constructor(client) {
      super(client, {
        name: "lockdown",
        description: "Locks a channel down for a set duration. Use \"lockdown release\" to end the lockdown prematurely.",
        category: "Moderation",
        usage: "lockdown <duration (seconds | minute(s) | hour(s))>",
        guildOnly: true,
        permLevel: "Moderator"
      });
    }

    async run(message, args, level, settings) { 
        if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);

        if (!this.client.lockit) this.client.lockit = [];
        const time = args.join(" ");
        const validUnlocks = ["release", "rel", "unlock", "end", "stop"];
        if (!time) return message.react('🚫 '), message.channel.send("Command Usage: `lockdown <duration (seconds | minute(s) | hour(s))>`");

        try {
            if (validUnlocks.includes(time)) {
                message.channel.overwritePermissions(message.guild.id, {
                    SEND_MESSAGES: null
                }).then(() => {
                    message.channel.send("🔓 | Lockdown lifted.");
                    clearTimeout(this.client.lockit[message.channel.id]);
                    delete this.client.lockit[message.channel.id];
                });
            } else {
                message.channel.overwritePermissions(message.guild.id, {
                    SEND_MESSAGES: false
                }).then(() => {
                    const embed = new RichEmbed()
                        .setTitle("🔒 | __**Channel locked down**__")
                        .setColor('RANDOM')
                        .addField('Channel:', `#${message.channel.name} (${message.channel.id})`)
                        .addField('Duration:', `${ms(ms(time), { long: true })}`)
                        .addField('Issued by:', `${message.author.tag}`)
                        .setFooter('Moderation system powered by Celestia <3', this.client.user.displayAvatarURL)
                        .setTimestamp();
                    message.channel.send({ embed })
                    .then(() => {
                        this.client.lockit[message.channel.id] = setTimeout(() => {
                            message.channel.overwritePermissions(message.guild.id, {
                                SEND_MESSAGES: null
                            })
                            .then(message.channel.send("🔓 | Lockdown lifted."));
                            delete this.client.lockit[message.channel.id];
                        }, ms(time));
                    });
                });
            }
        } catch (error) {
            message.channel.send(`🚫 | An error occurred whilst trying to lock this channel down. Use \`${settings.prefix}help lockdown\` to see how to use this command.`);
        }
    }
}

module.exports = Lockdown;