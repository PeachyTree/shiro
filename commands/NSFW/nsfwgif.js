const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');
const subreddits = [
    "NSFW_GIF",
    "nsfw_gifs",
    "porninfifteenseconds",
    "60FPSPorn",
    "porn_gifs",
    "nsfw_Best_Porn_Gif",
    "LipsThatGrip",
    "adultgifs"
]

class NSFWGif extends Command {
    constructor(client) {
        super(client, {
            name: 'nsfwgif',
            description: 'Finds NSFW gifs for you!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'nsfwgif',
            guildOnly: true,
            aliases: ['nsfwg', 'porngif']
        });
    }

    async run(message, args, level, settings) {
        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        let randSubreddit = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(randSubreddit)
        .then(url => {
            const embed = new MessageEmbed()
                .setFooter('NSFW.gif', 'https://a.safe.moe/O8TDd.png')
                .setDescription(`[Image URL](${url})`)   
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })
    }
}

module.exports = NSFWGif;