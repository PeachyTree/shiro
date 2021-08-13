const Command = require('../../structures/Command');
const ms = require('ms');

module.exports = class ReminderCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reminder',
			aliases: ['timer'],
			group: 'productivity',
			memberName: 'reminder',
			description: 'Sets a reminder for you with the given time.',
			args: [
				{
					key: 'reminderTime',
					prompt: 'What should the time of the reminder be? Please use this format: h | min | sec',
					type: 'string'
				},
        {
					key: 'reminder',
					prompt: 'What should the reminder be about?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { reminderTime, reminder }) {
		try {
     msg.say(`☑️ | Got it, ${message.author.username}! I will remind you about **${reminder}** in **${reminderTime}**! *wink*`); 
      setTimeout(function() {
        return msg.reply(`you wanted me to remind you about: ${reminder}`);
      }, ms(reminderTime));
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};