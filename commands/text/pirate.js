const Command = require('../../structures/Command');
const { wordTrans } = require('custom-translate');
const dictionary = require('../../assets/json/pirate');

module.exports = class PirateCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pirate',
			aliases: ['pirate-speak'],
			group: 'text',
			memberName: 'pirate',
			description: 'Converts text to pirate-speak.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to pirate?',
					type: 'string',
					validate: text => {
						if (wordTrans(text, dictionary).length < 2000) return true;
						return 'Invalid text, your text is too long.';
					}
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(wordTrans(text, dictionary));
	}
};