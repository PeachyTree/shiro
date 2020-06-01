// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const errors = require('../../assets/json/command/errors');

class Boobs extends Command {
    constructor(client) {
        super(client, {
            name: 'boobs',
            description: 'Shows a picture of boobs!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'c.boobs',
            guildOnly: true,
            aliases: ['boobies', 'bobs']
        });
    }

    async run(message, args, level, settings) {

        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);

        } else {

            const id = [Math.floor(Math.random() * 10930)];
            const res = await snekfetch.get(`http://api.oboobs.ru/boobs/${id}`);
            const preview = res.body[0]["PREVIEW".toLowerCase()];
            const image = `http://media.oboobs.ru/${preview}`;

            const embed = new RichEmbed()
                .setFooter('http://oboobs.ru/')
                .setImage(image)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        }
    }
}

module.exports = Boobs;