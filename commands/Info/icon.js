const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class IconCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'icon',
			aliases: ['server-icon', 'guild-icon'],
			group: 'info',
			memberName: 'icon',
			description: 'Sends the current server\'s icon.'
		});
	}

	run(msg) {
		try {
      const icon = msg.guild.iconURL({
        format: 'png',
        size: 2048
      });
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Server icon of ${msg.guild.name}`)
        .setImage(icon);
      return msg.embed(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};