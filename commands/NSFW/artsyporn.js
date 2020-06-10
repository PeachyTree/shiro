// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

class Artsyporn extends Command {
    constructor(client) {
        super(client, {
            name: 'artsyporn',
            description: 'Finds artsy..? Porn?? For you!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'artsyporn',
            guildOnly: true,
            aliases: ['artsy']
        });
    }

    async run(message, args, level, settings) {
        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        randomPuppy('SexyButNotPorn')
        .then(url => {
            const embed = new RichEmbed()
                .setFooter(`ArtsyPorn`)
                .setDescription(`[Image URL](${url})`)   
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })
    }
}

module.exports = Artsyporn;