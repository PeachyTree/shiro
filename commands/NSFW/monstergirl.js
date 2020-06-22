const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

class MonsterGirl extends Command {
    constructor(client) {
        super(client, {
            name: 'monstergirls',
            description: 'Finds monstergirls for you!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'monstergirl',
            guildOnly: true,
            aliases: ['mg', 'monster']
        });
    }

    async run(message, args, level, settings) {

        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        randomPuppy('MonsterGirl')
        .then(url => {
            const embed = new RichEmbed()
                .setFooter(`MonsterGirl`)
                .setDescription(`[Image URL](${url})`)   
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })
    }
}

module.exports = MonsterGirl;