// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');

class Zr extends Command {
    constructor(client) {
        super(client, {
            name: 'zr',
            description: '"Absolute Territory" (絶対領域, zettai ryouiki) describes the amount of bare thigh skin between the skirt and stockings or socks for female characters.',
            category: 'NSFW',
            usage: 'c.zr',
            guildOnly: true,
            aliases: ['zettairyouiki']
        });
    }

    async run(message, args, level, settings) {

        randomPuppy('ZettaiRyouiki')
        .then(url => {
            const embed = new RichEmbed()
                .setFooter(`ZettaiRyouiki`)
                .setDescription(`[Image URL](${url})`)
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })
    }
}

module.exports = Zr;