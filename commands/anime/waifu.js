const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const waifus = require('../../assets/json/waifus.json');
const total = Object.keys(waifus).length;

module.exports = class WaifuCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'waifu',
			aliases: ['waif'],
			group: 'anime',
			memberName: 'waifu',
			description: `Finds you a waifu from a database of ${total} waifus!`,
			details: 'Others can vote on the waifu through reactions!',
			args: [
				{
					key: 'waifuNumber',
					prompt: 'Which waifu (number) do you want to view?',
					type: 'string',
					default: '',
					oneOf: waifus
				}
			]
		});
	}

	async run(msg, { waifuNumber }) {
      if (waifuNumber <= total && waifuNumber > 0) return msg.say(`That's not a valid waifu number! There are only **${total}** waifus right now, *choose a number between 1 and ${total}*!`);
      try {
        if (!waifuNumber) {
          let random = Math.floor(Math.random() * total + 1);
          let waifu = waifus[random];
          const embed = new MessageEmbed()
            .setAuthor(waifu.name, waifu.image)
            .setDescription(waifu.origin)
            .setImage(waifu.image)
            .setFooter(`Waifu Number ${random}`)
            .setColor('#FAC193');
          let ms = await msg.say(`💝 | **${waifu.name}**? `, { embed });
          await ms.react('👍');
          await ms.react('👎');
          return null;
        } else if (waifuNumber) {
          let waifu = waifus[waifuNumber];
          const embed = new MessageEmbed()
            .setAuthor(waifu.name, waifu.image)
            .setDescription(waifu.origin)
            .setImage(waifu.image)
            .setFooter(`Waifu Number ${waifuNumber}`)
            .setColor('#FAC193');
          let ms = await msg.say(`💝 | Here's waifu number **${waifuNumber}**!`, { embed });
          await ms.react('👍');
          await ms.react('👎');
          return null;
        }
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};