const Command = require('../../structures/Command');
const { MessageAttachment } = require('discord.js');

module.exports = class AchievementCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'achievement',
			aliases: ['achieve'],
			group: 'random-image',
			memberName: 'achievement',
			description: 'Sends a Minecraft achievement with the text you provided.',
			args: [
				{
					key: 'text',
					prompt: 'What should the achievement say?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { text }) {
		try {
			if (!args[0]) return message.reply('Commanf Usage: `achievement <text>`');
			return msg.say(new MessageAttachment('https://www.minecraftskinstealer.com/achievement/a.php?i=20&h=Achievment+Get!&t=' + encodeURIComponent(text), 'mc.png'));  
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};