// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/command/errors');

class Amateur extends Command {
    constructor(client) {
        super(client, {
            name: 'amateur',
            description: 'Finds?? Amateur...nsfw?? For you...??\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'c.amateur',
            guildOnly: true
        });
    }

    async run(message, args, level, settings) {
        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        let subreddits = [
            'RealGirls',
            'amateur',
            'gonewild'
        ]

        let sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
        .then(url => {
            const embed = new RichEmbed()
                .setFooter(`amateur`)
                .setDescription(`[Image URL](${url})`)
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })
    }
}

module.exports = Amateur;