const Command = require('../../structures/Command');

module.exports = class LMGTFYCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'lmgtfy',
			aliases: ['google-it'],
			group: 'other',
			memberName: 'lmgtfy',
			description: 'Why don\'t you just... Google it?',
			args: [
				{
					key: 'textQuery',
					prompt: 'What do you want to google for?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { textQuery }) {
		try {
      const query = encodeURIComponent(textQuery);
      const url = `https://lmgtfy.com/?q=${query}`;
      return msg.say(`"${textQuery}"\n**<${url}>**`);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};