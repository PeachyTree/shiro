const ImgurAlbumCommand = require('../../structures/commands/ImgurAlbum');
const { TICKLE_ALBUM_ID } = process.env;

module.exports = class TickleCommand extends ImgurAlbumCommand {
	constructor(client) {
		super(client, {
			name: 'tickle',
			group: 'action',
			memberName: 'tickle',
			description: 'Tickles the user you mentioned!',
			clientPermissions: ['ATTACH_FILES'],
			albumID: TICKLE_ALBUM_ID,
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to tickle?',
					type: 'user'
				}
			]
		});
	}

	generateText(msg, user) {
		return `_**${msg.author.username}** tickles **${user.username}**._`;
	}
};