const Command = require('../../structures/Command');

module.exports = class ShipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ship',
			aliases: ['ship-name'],
			group: 'text',
			memberName: 'ship',
			description: 'Combines two or more mentioned user\'s names.'
		});
	}

	run(msg) {
    let users = msg.mentions.users.map(u => u.username);
    let shippedName = '';
    for (let i = 0; i < users.length; i++) {
      shippedName += `${users[i].substring(0, users[i].length / 2)}`;
    }
    return msg.say(`${users.join(' + ')} = **${shippedName}**`);
	}
};