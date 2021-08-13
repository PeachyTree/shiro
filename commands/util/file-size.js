const Command = require('../../structures/Command');
const fs = require('fs');

module.exports = class FileSizeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'file-size',
			group: 'bot-owner',
			memberName: 'file-size',
			description: 'Returns the value of the size of the specified file.',
			ownerOnly: true,
			guarded: true,
			args: [
				{
					key: 'file',
					prompt: 'What file would you like to check the file size on?',
					type: 'string'
				}
			]
		});
	}

	run(msg) {
		try {
			const stats = fs.statSync(file);
			const fileBytes = stats["size"];
			const fileKB = fileBytes / 1024;
			return msg.say(`\`${file}\` currently has a size of **${fileBytes}** bytes (${fileKB.toFixed(2)}KB).`);
		} catch (error) {
			if (error.code === 'ENOENT') return msg.say(`The file \`${file}\` could not be found.`);
		}
	}
};