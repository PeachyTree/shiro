const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const options = ['online', 'idle', 'dnd', 'invisible'];

module.exports = class StatusCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'status',
			aliases: ['presence'],
			group: 'bot-owner',
			memberName: 'status',
			description: 'Sets the bot\'s presence/status.',
			ownerOnly: true,
			guarded: true,
			args: [
				{
					key: 'status',
					prompt: 'Which status do you want the bot to change into? Either online, idle, dnd or invisible?',
					type: 'string',
					oneOf: options,
					parse: status => status.toLowerCase()
				}
			]
		});
	}

	run(msg, { status }) {
    this.client.user.setStatus(status);
    return msg.say(stripIndents`
      ☑️ | Status successfully changed to **${statusType}**.
      Please note that initially changing status may take up to a minute or two.
    `);
  } 
};