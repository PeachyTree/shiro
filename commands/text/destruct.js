const Command = require('../../structures/Command');
const ms = require('ms');

module.exports = class DestructCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'destruct',
			aliases: ['self-destruct'],
			group: 'text',
			memberName: 'destruct',
			description: 'Sends the same message that you had sent, but it will get auto deleted after a specific amount of time.',
			args: [
				{
					key: 'text',
					prompt: 'What text do you want to self-destruct?',
					type: 'string'
				},
        {
					key: 'time',
					prompt: 'For how long should (in seconds) the message stay, and then self-destruct?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { text, time }) {
		try {      
      msg.delete();
      let destructMsg = await msg.say(`${text}`); 
      setTimeout(function() {
        return msg.delete(`${destructMsg}`);
      }, ms(time));
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};