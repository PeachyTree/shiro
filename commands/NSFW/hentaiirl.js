// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

class HentaiIrl extends Command {
    constructor(client) {
        super(client, {
            name: 'hentaiirl',
            description: 'Hentai! But depicts of real situations!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'c.hentaiirl',
            guildOnly: true,
            aliases: ['irl', 'hirl']
        });
    }

    async run(message, args, level, settings) {
        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢')
            return message.channel.send(errMessage);
        }

        randomPuppy('hentai_irl')
        .then(url => {
            const embed = new RichEmbed()
                .setFooter('Hentai_irl', 'https://a.safe.moe/jZZKM.png')
                .setDescription(`[Image URL](${url})`)   
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })
    }
}

module.exports = HentaiIrl;