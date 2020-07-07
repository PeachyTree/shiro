const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

class Lingerie extends Command {
  constructor(client) {
    super(client, {
      name: 'lingerie',
      description: 'Finds...girls wearing..lingerie? ...For you!\nThis command can only be used in NSFW channels!',
      category: 'NSFW',
      usage: 'lingerie',
      guildOnly: true,
      aliases: ['thighhighs', 'stockings']
    });
  }

    async run(message, args, level, settings) {
        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        let subreddits = [
            'lingerie',
            'stockings',
            'pantyfetish',
            'panties'
        ]

        let sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
        .then(url => {
            const embed = new MessageEmbed()
                .setFooter(`Lingerie`)
                .setDescription(`[Image URL](${url})`)   
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })
    }
}

module.exports = Lingerie;