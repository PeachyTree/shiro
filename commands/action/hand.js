const ImgurAlbumCommand = require('../../structures/commands/ImgurAlbum');
const { HAND_ALBUM_ID } = process.env;

module.exports = class HandCommand extends ImgurAlbumCommand {
	constructor(client) {
		super(client, {
			name: 'hand',
			aliases: ['hand-hold', 'hold-hands'],
			group: 'action',
			memberName: 'hand',
			description: 'Holds hands with the user you mentioned!',
			clientPermissions: ['ATTACH_FILES'],
			albumID: HAND_ALBUM_ID,
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to hold hands with?',
					type: 'user'
				}
			]
		});
	}

	generateText(msg, user) {
		return `_**${msg.author.username}** holds hands with **${user.username}**._`;
	}
};