// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const booru = require('booru');
const errors = require('../../assets/json/errors');

class Yandere extends Command {
    constructor(client) {
        super(client, {
            name: 'yandere',
            description: 'Searches for images on Yandere!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'c.yandere <Query>',
            guildOnly: true,
            aliases: ['yd']
        });
    }

    async run(message, args, level, settings) {

        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!');

        let query = message.content.split(/\s+/g).slice(1).join(" ");

        booru.search('yandere', [query], { limit: 1, random: true })
        .then(booru.commonfy)
        .then(images => {
            for (let image of images) {
                const embed = new RichEmbed()
                    .setAuthor(`Yandere ${query}`, 'https://c.catgirlsare.sexy/NrAI.png')
                    .setImage(image.common.file_url)
                    .setColor('RANDOM');
                message.channel.send({ embed });
            }
        }).catch(err => {
            if (err.name === 'booruError') {
                return message.channel.send(`No search results found for **${query}**!`);
            } else {
                return message.channel.send(`No search results found for **${query}**!`);
            }
        })
    }
}

module.exports = Yandere;