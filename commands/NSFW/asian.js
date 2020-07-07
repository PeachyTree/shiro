const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

class Asian extends Command {
    constructor(client) {
        super(client, {
            name: 'asian',
            description: 'Finds...asians?????...for??? you?!?!?!!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'asian',
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
            'AsianHotties',
            'juicyasians',
            'asianbabes'
        ]

        let sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
        .then(url => {
            const embed = new MessageEmbed()
                .setFooter(`asian`)
                .setDescription(`[Image URL](${url})`)   
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })
    }
}

module.exports = Asian;