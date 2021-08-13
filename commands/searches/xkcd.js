const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const xkcd = require('xkcd');
const getRandomInt = require('../../util/Util');

module.exports = class XKCDCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'xkcd',
			aliases: ['kcd'],
			group: 'searches',
			memberName: 'xkcd',
			description: 'Searches for a comic on xkcd.',
			args: [
				{
					key: 'number',
					prompt: 'What comic are you searching for? (Comic number)',
					type: 'string',
					default: 'latest'
				}
			]
		});
	}

	async run(msg, { number }) {
		try {
      if (latest) {
        await xkcd((data) => {
          const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`__**${data.title}**__`)
            .setDescription(data.alt)
            .setURL(`https://xkcd.com/${data.num}`)
            .addField('Comic Number', data.num, true)
            .addField('Publication Date', new Date(data.year, data.month, data.day).toDateString(), true)
            .setImage(data.img)
            .setFooter('Powered by xkcd')
          return msg.embed(embed);
        });
      } else {
        await xkcd((data) => {
          let comicNumber;
          if (number && !isNaN(number)) {
            comicNumber = number > data.num ? data.num : number;
          }
          else {
            comicNumber = getRandomInt(1, data.num);
            comicNumber = Number.random(1, data.num);
          }
          xkcd(comicNumber, (data) => {
            const embed = new MessageEmbed()
              .setColor('RANDOM')
              .setTitle(`__**${data.title}**__`)
              .setDescription(data.alt)
              .setURL(`https://xkcd.com/${data.num}`)
              .addField('Comic Number', data.num, true)
              .addField('Publication Date', new Date(data.year, data.month, data.day).toDateString(), true)
              .setImage(data.img)
              .setFooter('Powered by xkcd')
            return msg.embed(embed);
          });
        });
      }
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};