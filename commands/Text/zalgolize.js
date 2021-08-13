const Command = require('../../structures/Command');
const zalgo = require('../../assets/json/zalgo');

module.exports = class ZalgolizeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'zalgolize',
			aliases: ['zalgo'],
			group: 'text',
			memberName: 'zalgolize',
			description: 'Sends the same message that you had sent, but zalgolized.',
			args: [
				{
					key: 'text',
					prompt: 'What text do you want to zalgolize?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { text }) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += text[i];
      for (const chars of Object.values(zalgo)) {
        let count = Math.floor(Math.random() * 5);
        while (count--) result += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    return msg.say(result);
	}
};