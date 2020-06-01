// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const errors = require('../../assets/json/command/errors');

class GTN extends Command {
    constructor(client) {
        super(client, {
            name: 'gtn',
            description: 'Finds a GreenTeaNeko comic!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'c.gtn',
            guildOnly: true,
            aliases: ['nsfwcomics']
        });
    }

    async run(message, args, level, settings) {


        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        let text = await snekfetch.get(`https://rra.ram.moe/i/r?nsfw=true`);
        let body = JSON.parse(text.text);

        //let recipient = message.content.split(/\s+/g).slice(1).join(" ");
        let embed = new RichEmbed()
            .setColor('RANDOM')
            .setImage(`https://rra.ram.moe${body.path}`);
        return message.channel.send({ embed });
    }
}

module.exports = GTN;