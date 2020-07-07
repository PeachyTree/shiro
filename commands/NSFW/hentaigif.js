const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

class HentaiGif extends Command {
    constructor(client) {
        super(client, {
            name: 'hentaigif',
            description: 'Finds hentai gifs for you!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'hentaigif',
            guildOnly: true,
            aliases: ['hgif']
        });
    }

    async run(message, args, level, settings) {

        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        randomPuppy('HENTAI_GIF')
        .then(url => {
            const embed = new MessageEmbed()
                .setFooter(`hentai.gif`)
                .setDescription(`[Image URL](${url})`)   
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })
    }
}

module.exports = HentaiGif;