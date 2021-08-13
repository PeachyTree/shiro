const Command = require('../../structures/Command');

module.exports = class ReloadCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reload',
			aliases: ['reload-command'],
			group: 'bot-owner',
			memberName: 'reload',
			description: 'Reloads a command.',
			guarded: true,
			ownerOnly: true,
			args: [
				{
					key: 'command',
					prompt: 'Which command would you like to reload?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { command }) {
		command.reload();
		return msg.say(`Reloaded the \`${command.name}\` command.`);
	}
};