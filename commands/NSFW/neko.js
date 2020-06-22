const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');

class Neko extends Command {
    constructor(client) {
        super(client, {
            name: 'neko',
            description: 'Nekos!\nThis command is NSFW in NSFW channels and not NSFW in normal channels!',
            category: 'NSFW',
            usage: 'neko',
            guildOnly: true,
            aliases: ['catgirls', 'nekomimi', 'nekos']
        });
    }

    async run(message, args, level, settings) {
        if (!message.channel.nsfw) {
            const res = await request.get('http://nekos.life/api/neko');
            const preview = res.body.neko;

            const embed = new RichEmbed()
                .setImage(preview)
                .setColor('RANDOM')
                .setFooter('http://nekos.life', 'https://a.safe.moe/3XYZ6.gif');
            return message.channel.send({ embed });

        } else {
            const res = await request.get('http://nekos.life/api/lewd/neko');
            const preview = res.body.neko;

            const embed = new RichEmbed()
                .setImage(preview)
                .setColor('RANDOM')
                .setFooter('http://nekos.life', 'https://a.safe.moe/3XYZ6.gif');
            return message.channel.send({ embed });
        }
    }
}

module.exports = Neko;