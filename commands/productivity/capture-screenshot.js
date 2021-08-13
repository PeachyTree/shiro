const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class CaptureScreenshotCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'capture-screenshot',
			aliases: ['screenshot'],
			group: 'productivity',
			memberName: 'capture-screenshot',
			description: 'Captures a screenshot of a given URL.',
			nsfw: true,
			args: [
				{
					key: 'url',
					prompt: 'What webpage do you want to get a screenshot from (URL)?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { url }) {
		try {
        const { body } = await request.get(`https://image.thum.io/get/width/1920/crop/675/noanimate/${url}`);
        return msg.say({ files: [{ attachment: body, name: 'screenshot.png' }] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};