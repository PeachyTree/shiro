const ImgurAlbumCommand = require('../../structures/commands/ImgurAlbum');
const { WINK_ALBUM_ID } = process.env;

module.exports = class WinkCommand extends ImgurAlbumCommand {
	constructor(client) {
		super(client, {
			name: 'wink',
			group: 'action',
			memberName: 'wink',
			description: 'Winks at the specified user!',
			clientPermissions: ['ATTACH_FILES'],
			albumID: WINK_ALBUM_ID,
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to wink at?',
					type: 'user'
				}
			]
		});
	}

	generateText(msg, user) {
		return `_**${msg.author.username}** winks at **${user.username}**._`;
	}
};