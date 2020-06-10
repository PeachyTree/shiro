// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

class Grool extends Command {
    constructor(client) {
        super(client, {
            name: 'grool',
            description: 'Finds..grool?? For you...??\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'grool',
            guildOnly: true
        });
    }

    async run(message, args, level, settings) {
        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        randomPuppy('grool')
        .then(url => {
            const embed = new RichEmbed()
                .setFooter(`grool`)
                .setDescription(`[Image URL](${url})`)   
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })
    }
}

module.exports = Grool;