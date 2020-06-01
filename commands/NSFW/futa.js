// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/command/errors');

class Futa extends Command {
    constructor(client) {
        super(client, {
            name: 'futa',
            description: 'Finds... futas...? For...you?\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'c.futa',
            guildOnly: true,
            aliases: ['futarani']
        });
    }

    async run(message, args, level, settings) {
        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        randomPuppy('futanari')
        .then(url => {
            const embed = new RichEmbed()
                .setFooter(`futanari`)
                .setDescription(`[Image URL](${url})`)   
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })

        return null;
    }
}

module.exports = Futa;