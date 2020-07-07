const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const errors = require('../../assets/json/errors');

class Boobs extends Command {
    constructor(client) {
        super(client, {
            name: 'boobs',
            description: 'Shows a picture of boobs!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'boobs',
            guildOnly: true,
            aliases: ['boobies', 'bobs']
        });
    }

    async run(message, args, level, settings) {

        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);

        } else {

            const id = [Math.floor(Math.random() * 10930)];
            const res = await request.get(`http://api.oboobs.ru/boobs/${id}`);
            const preview = res.body[0]["PREVIEW".toLowerCase()];
            const image = `http://media.oboobs.ru/${preview}`;

            const embed = new MessageEmbed()
                .setFooter('http://oboobs.ru/')
                .setImage(image)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        }
    }
}

module.exports = Boobs;