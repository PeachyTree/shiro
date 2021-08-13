const ImgurAlbumCommand = require('../../structures/commands/ImgurAlbum');
const { PAT_ALBUM_ID } = process.env;

module.exports = class PatCommand extends ImgurAlbumCommand {
	constructor(client) {
		super(client, {
			name: 'pat',
			aliases: ['pet'],
			group: 'action',
			memberName: 'pat',
			description: 'Pats the user you mentioned on the head!',
			clientPermissions: ['ATTACH_FILES'],
			albumID: PAT_ALBUM_ID,
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to pat?',
					type: 'user'
				}
			]
		});
	}

	generateText(msg, user) {
		return `_**${msg.author.username}** pats **${user.username}**._`;
	}
};