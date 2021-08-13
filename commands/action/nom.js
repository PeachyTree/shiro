const ImgurAlbumCommand = require('../../structures/commands/ImgurAlbum');
const { NOM_ALBUM_ID } = process.env;

module.exports = class NomCommand extends ImgurAlbumCommand {
	constructor(client) {
		super(client, {
			name: 'nom',
			aliases: ['eat'],
			group: 'action',
			memberName: 'nom',
			description: 'Noms on the user you mentioned!',
			clientPermissions: ['ATTACH_FILES'],
			albumID: NOM_ALBUM_ID,
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to nom on?',
					type: 'user'
				}
			]
		});
	}

	generateText(msg, user) {
		return `_**${msg.author.username}** noms on **${user.username}**._`;
	}
};