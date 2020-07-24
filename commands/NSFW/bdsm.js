const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

class BDSM extends Command {
    constructor(client) {
        super(client, {
            name: "bdsm",
            description: "Finds BDSM porn for you.",
            category: "NSFW",
            usage: "bdsm"
        });
    }

    async run(message) {
        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }
    
        randomPuppy('bdsm')
            .then(url => {
                const embed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle("__BDSM__")
                    .setURL(url)
                    .setImage(url);
                message.channel.send({ embed });
        })
    }
};

module.exports = BDSM;