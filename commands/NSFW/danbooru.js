const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const booru = require('booru');
const errors = require('../../assets/json/errors');

class Danbooru extends Command {
    constructor(client) {
        super(client, {
            name: "danbooru",
            description: "Searches danbooru for you.",
            category: "NSFW",
            usage: "danbooru <Query>"
        });
    }

    async run(message, args) {

    let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
    if (!message.channel.nsfw) {
        message.react('💢');
        return message.channel.send(errMessage);
    }

    const query = args.join(" ");

    if (!query) return message.channel.send('Command Usage: `danbooru <Query>`');
    if (query.toUpperCase().includes('LOLI') || query.toUpperCase().includes('GORE')) return message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!');

    booru.search('db', [query], {random: true })
        .then(booru.commonfy)
        .then(images => {
            for (let image of images) {
                const embed = new MessageEmbed()
                    .setTitle("__Danbooru__")
                    .setImage(image.common.file_url)
                    .setColor('RANDOM')
                    .setFooter(`danbooru ${query}`)
                    .setURL(image.common.file_url);
                return message.channel.send({ embed });
            }
        }).catch(err => {
            if (err.name === 'booruError') {
                return message.channel.send(`No results found for **${query}**!`);
            } else {
                return message.channel.send(`No results found for **${query}**!`);
            }
        })
    }
};

module.exports = Danbooru;