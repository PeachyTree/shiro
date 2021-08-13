const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class ColorCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'color',
			aliases: ['colour'],
			group: 'productivity',
			memberName: 'color',
			description: 'Shows a random color or a preview of the given color!',
			args: [
				{
					key: 'color',
					prompt: 'What color do you want to get a preview of?',
					type: 'string',
					default: ''
				}
			]
		});
	}

	async run(msg, { color }) {
		try {
            if (!color) {
                let genColour = '#' + Math.floor(Math.random() * 16777215).toString(16);
                const embed = new MessageEmbed()
                    .setColor(genColour)
                    .setImage(`https://dummyimage.com/50/${genColour.slice(1)}/&text=%20`)
                    .setFooter(genColour);
                return msg.say('Here\'s your color!', { embed: embed });
            }
            if (((color.indexOf("#") === 0) && color.length === 7) || (!isNaN(color) && color.length <= 8 && color < 16777215)) {
                const embed = await new MessageEmbed()
                    .setColor(color)
                    .setImage(`https://dummyimage.com/50/${color.slice(1)}/&text=%20`)
                    .setFooter(color);
                return msg.embed(embed);
            }
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};