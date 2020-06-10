// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const errors = require('../../assets/json/errors');

class Ass extends Command {
    constructor(client) {
        super(client, {
            name: 'ass',
            description: 'A random picture of...ASS!!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'ass',
            guildOnly: true,
            aliases: ['butt', 'booty', 'butts']
        });
    }

    async run(message, args, level, settings) {
        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))]
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);

        } else {

            const id = [Math.floor(Math.random() * 4923)];
            const res = await snekfetch.get(`http://api.obutts.ru/butts/${id}`);
            const preview = res.body[0]["PREVIEW".toLowerCase()];
            const image = `http://media.obutts.ru/${preview}`;

            const embed = new RichEmbed()
                .setFooter('http://obutts.ru/')
                .setImage(image)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        }
    }
}

module.exports = Ass;