const Command = require('../../structures/Command');
const request = require('node-superfetch');
const { stripIndents } = require('common-tags');
const { WEBSTER_KEY } = process.env;

module.exports = class DefineCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'define',
			aliases: ['dictionary', 'webster'],
			group: 'searches',
			memberName: 'define',
			description: 'Defines the word you provided.',
			args: [
				{
					key: 'word',
					prompt: 'What word do you want to define?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { word }) {
		try {
			const { body } = await request
				.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}`)
				.query({ key: WEBSTER_KEY });
			if (!body.length) return msg.say('Could not find any results.');
			const data = body[0];
			if (typeof data === 'string') return msg.say(`Could not find any results. Did you mean **${data}**?`);
			return msg.say(stripIndents`
				**${data.meta.stems[0]}** (${data.fl})
				${data.shortdef.map((definition, i) => `(${i + 1}) ${definition}`).join('\n')}
			`);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};