const Command = require('../../structures/Command');

module.exports = class PiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pi',
			aliases: ['π'],
			group: 'info',
			memberName: 'pi',
			description: 'Returns the value of Pi (π).'
		});
	}

	run(msg) {
    return msg.say(`π = **${Math.PI}**...`);
	}
};