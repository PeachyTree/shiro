const Command = require('../../structures/Command');
const path = require('path');
const { delay } = require('../../util/Util');

module.exports = class WhereIsEverybodyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'where-is-everybody',
			aliases: ['where-is-everyone', 'where-everybody', 'where-everyone'],
			group: 'single',
			memberName: 'where-is-everybody',
			description: 'Where is everybody?',
			throttling: {
				usages: 1,
				duration: 30
			},
			clientPermissions: ['ATTACH_FILES', 'MENTION_EVERYONE'],
			userPermissions: ['MENTION_EVERYONE'],
		});
	}

	async run(msg) {
		await msg.channel.send('"It\'s quiet..."', {
			files: [path.join(__dirname, '..', '..', 'assets', 'images', 'where-is-everybody', 'part-1.jpg')]
		});
		await delay(5000);
		await msg.channel.send('"Too quiet..."', {
			files: [path.join(__dirname, '..', '..', 'assets', 'images', 'where-is-everybody', 'part-2.jpg')]
		});
		await delay(5000);
		return msg.channel.send('"Where is @everyone?"', {
			disableMentions: 'none',
			files: [path.join(__dirname, '..', '..', 'assets', 'images', 'where-is-everybody', 'part-3.jpg')]
		});
	}
};
