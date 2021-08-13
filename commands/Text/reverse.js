const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class ReverseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reverse',
			aliases: ['esrever'],
			group: 'text',
			memberName: 'reverse',
			description: 'Sends the same message that you had sent but reversed.',
			args: [
				{
					key: 'text',
					prompt: 'What text do you want to make reverse?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { text }) {
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('__**txeT desreveR**__')
      .setDescription(text.split('').reverse().join(''))
    await msg.embed(embed);
	}
};