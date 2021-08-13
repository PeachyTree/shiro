const Command = require('../../structures/Command');
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/emojify');

module.exports = class EmojifyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'emojify',
			group: 'text',
			memberName: 'emojify',
			description: 'Sends the same message that you had sent, but converts it into emoji form.',
			args: [
				{
					key: 'text',
					prompt: 'What text do you want to emojify?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { text }) {
        return msg.say(letterTrans(text, dictionary, ' '));
	}
};