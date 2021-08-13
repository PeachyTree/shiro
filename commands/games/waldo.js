const Command = require('../../structures/Command');
const { shuffle } = require('../../util/Util');
const waldos = require('../../assets/json/waldo');

module.exports = class WaldoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'waldo',
			aliases: ['wheres-waldo', 'where\'s-waldo', 'wally', 'wheres-wally', 'where\'s-wally'],
			group: 'games-sp',
			memberName: 'waldo',
			description: 'Try to find Waldo with spoiler tags!'
		});
	}

	run(msg) {
		const where = shuffle(waldos);
		return msg.say(where.map(waldo => `||${waldo}||`).join(' '));
	}
};
