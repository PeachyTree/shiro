const ImgurAlbumCommand = require('../../structures/commands/ImgurAlbum');
const { STARE_ALBUM_ID } = process.env;

module.exports = class StareCommand extends ImgurAlbumCommand {
	constructor(client) {
		super(client, {
			name: 'stare',
			aliases: ['glare'],
			group: 'action',
			memberName: 'stare',
			description: 'Stares at the user you mentioned!',
			clientPermissions: ['ATTACH_FILES'],
			albumID: STARE_ALBUM_ID,
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to stare at?',
					type: 'user'
				}
			]
		});
	}

	generateText(msg, user) {
		return `_**${msg.author.username}** stares at **${user.username}**._`;
	}
};