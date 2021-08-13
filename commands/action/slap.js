const ImgurAlbumCommand = require('../../structures/commands/ImgurAlbum');
const { SLAP_ALBUM_ID } = process.env;

module.exports = class SlapCommand extends ImgurAlbumCommand {
	constructor(client) {
		super(client, {
			name: 'slap',
			aliases: ['punch', 'hit', 'punish'],
			group: 'action',
			memberName: 'slap',
			description: 'Slaps the user you mentioned!',
			clientPermissions: ['ATTACH_FILES'],
			albumID: SLAP_ALBUM_ID,
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to slap?',
					type: 'user'
				}
			]
		});
	}

	generateText(msg, user) {
		return `_**${msg.author.username}** slaps **${user.username}**._`;
	}
};