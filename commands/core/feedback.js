const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { version } = require('../../package.json');
const { FEEDBACK_EMOJI_ID } = process.env;
const types = ['suggestion', 'bug', 'other'];

module.exports = class FeedbackCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'feedback',
			aliases: ['suggestion', 'suggest', 'bug'],
			group: 'core',
			memberName: 'feedback',
			description: 'Want to give feedback? Encountered any bugs?',
			guarded: true,
			args: [
				{
					key: 'type',
					prompt: 'What do you want to report?',
					type: 'string',
					oneOf: types,
					parse: type => type.toLowerCase()
				},
                {
					key: 'message',
					prompt: 'Explain it!',
					type: 'string'
				}
			]
		});
	}

	async run(msg) {
		try {
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`${FEEDBACK_EMOJI_ID} | Feedback command used by ${msg.author.tag}`)
                .addField('Type:', type)
                .addField('Report message:', message)
                .setFooter(`Shiro v${version}`)
                .setTimestamp();
            const channel = await this.client.fetchReportChannel();
            channel.send(embed);
            await msg.react("🇸");
            await msg.react("🇪");
            await msg.react("🇳");
            await msg.react("🇹");
            return null; 
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};