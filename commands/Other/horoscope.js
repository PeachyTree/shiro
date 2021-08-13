const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const signs = require('../../assets/json/signs');

module.exports = class HoroscopeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'horoscope',
			aliases: ['sign'],
			group: 'other',
			memberName: 'horoscope',
			description: 'Gets your daily horoscope!',
			args: [
				{
					key: 'sign',
					prompt: 'What sign do you want to search the horoscope for?',
					type: 'string',
					oneOf: signs,
					parse: sign => sign.toLowerCase()
				}
			]
		});
	}

	async run(msg, { sign }) {
		try {
            const text = await request.get(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`);
            const body = JSON.parse(text.body);
            let horoscope = body.horoscope;
            let replaced = horoscope.replace('(c) Kelli Fox, The Astrologer, http://new.theastrologer.com', '');
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`🔮 | Horoscope for ${body.sunsign} on ${body.date}`, 'http://images.indianexpress.com/2017/01/zodiac-love-2017-main_820_thinkstockphotos-481896132.jpg?w=820')
                .setDescription(replaced)
                .setTimestamp()
                .setFooter(`${message.author.username}'s Horoscope`)
                .addField('Mood', body.meta.mood, true)
                .addField('Intensity', body.meta.intensity, true);
            return msg.embed(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};