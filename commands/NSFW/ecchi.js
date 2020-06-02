// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

class Ecchi extends Command {
    constructor(client) {
        super(client, {
            name: 'ecchi',
            description: 'Finds ecchi for you!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'c.ecchi',
            guildOnly: true
        });
    }

    async run(message, args, level, settings) {

        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        randomPuppy('ecchi')
        .then(url => {
            const embed = new RichEmbed()
                .setFooter(`ecchi`)
                .setDescription(`[Image URL](${url})`)   
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })
    }
}

module.exports = Ecchi;