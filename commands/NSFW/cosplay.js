const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

class Cosplay extends Command {
    constructor(client) {
        super(client, {
            name: 'cosplay',
            description: 'Finds NSFW cosplay for you!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'cosplay',
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
            'nsfwcosplay',
            'cosplayonoff',
            'cosporn',
            'cosplayboobs'
        ]

        let sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
        .then(url => {
            const embed = new RichEmbed()
                .setFooter('cosplay')
                .setDescription(`[Image URL](${url})`)   
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })
    }
}

module.exports = Cosplay;