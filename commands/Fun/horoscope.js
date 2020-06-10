// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const signs = [
    "capricorn",
    "aquarius",
    "pisces",
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpio",
    "sagittarius"
]

class Horoscope extends Command {
    constructor(client) {
        super(client, {
            name: 'horoscope',
            description: 'Gets your daily horoscope!',
            category: 'Fun',
            usage: 'horoscope <Sign>',
            guildOnly: true,
            aliases: ['horo', 'sign']
        });
    }

    async run(message, args, level, settings) {
        const sign = message.content.split(/\s+/g).slice(1).join(" ");
        if (!sign) return message.channel.send("Please give me a sign to get the horoscope of!");

        if (!signs.includes(sign.toLowerCase())) return message.channel.send('That is not a valid sign!');

        const text = await snekfetch
            .get(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`);
        const body = JSON.parse(text.body);

        let horoscope = body.horoscope
        let replaced = horoscope.replace('(c) Kelli Fox, The Astrologer, http://new.theastrologer.com', '')

        const embed = new RichEmbed()
            .setColor('RANDOM')
            .setAuthor(`🔮 | Horoscope for ${body.sunsign} on ${body.date}`, 'http://images.indianexpress.com/2017/01/zodiac-love-2017-main_820_thinkstockphotos-481896132.jpg?w=820')
            .setDescription(replaced)
            .setTimestamp()
            .setFooter(`${message.author.username}'s Horoscope`)
            .addField('Mood', body.meta.mood, true)
            .addField("Intensity", body.meta.intensity, true);
        return message.channel.send({ embed });
    }
}

module.exports = Horoscope;