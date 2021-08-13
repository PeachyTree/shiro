const ImgurAlbumCommand = require('../../structures/commands/ImgurAlbum');
const { LICK_ALBUM_ID } = process.env;

module.exports = class LickCommand extends ImgurAlbumCommand {
	constructor(client) {
		super(client, {
			name: 'lick',
			group: 'action',
			memberName: 'lick',
			description: 'Licks the user you mentioned!',
			clientPermissions: ['ATTACH_FILES'],
			albumID: LICK_ALBUM_ID,
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to lick?',
					type: 'user'
				}
			]
		});
	}

	generateText(msg, user) {
		return `_**${msg.author.username}** licks **${user.username}**._`;
	}
};