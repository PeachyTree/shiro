const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const booru = require('booru');
const errors = require('../../assets/json/errors');

class Gelbooru extends Command {
    constructor(client) {
        super(client, {
            name: 'gelbooru',
            description: 'Searches for images on Gelbooru!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'gelbooru <Query>',
            guildOnly: true
        });
    }

    async run(message, args, level, settings) {

        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!');

        let query = args.join(" ");
        booru.search('gelbooru', [query], { limit: 1, random: true })
        .then(booru.commonfy)
        .then(images => {
            for (let image of images) {
                const embed = new RichEmbed()
                    .setAuthor(`Gelbooru ${query}`, 'https://c.catgirlsare.sexy/NrAI.png')
                    .setDescription(`[Image URL](${image.common.file_url})`)
                    .setImage(image.common.file_url)
                    .setColor('RANDOM');
                return message.channel.send({ embed });
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

module.exports = Gelbooru;