const Command = require('../../structures/Command');
const path = require('path');
const { list } = require('../../util/Util');
const types = ['default', 'moth', 'jojo', 'spoiler', 'nitro'];

module.exports = class DarkLightCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dark-light',
			aliases: ['dark-theme-light-theme', 'light-theme-dark-theme', 'dark-theme', 'light-theme', 'dtlt'],
			group: 'single',
			memberName: 'dark-light',
			description: 'Determines whether you use dark or light theme.',
			details: `**Types:** ${types.join(', ')}`,
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'type',
					prompt: `What type of meme do you want to use? Either ${list(types, 'or')}.`,
					type: 'string',
					default: 'default',
					oneOf: types,
					parse: type => type.toLowerCase()
				}
			]
		});
	}

	run(msg, { type }) {
		return msg.say({
			files: [path.join(__dirname, '..', '..', 'assets', 'images', 'dark-light', `${type}.png`)]
		});
	}
};
