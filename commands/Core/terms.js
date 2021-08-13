const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class TermsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'terms',
			aliases: ['terms-of-service'],
			group: 'core',
			memberName: 'terms',
			description: 'Read the bot\'s Terms of Service.',
			guarded: true
		});
	}

	async run(msg) {
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('__**Shiro Bot - Terms of Service**__')
      .setDescription(stripIndents`
        Shiro has access to the End User Data through the Discord API, but Shiro does not collect, use and/or disclose End User Data except (a) as necessary to exercise your rights under this Agreement, (b) in accordance with Discord’s Privacy Policy.
        We will never sell, license or otherwise commercialize any End User Data. Neither will we ever use End User Data to target End Users for marketing or advertising purposes. We will never even disclose any End User Data to any ad network, data broker or other advertising or monetization related service.
        End User Data will be retained only as necessary to provide the defined functionality of the Application and nothing more.
        We ensure that all End User Data is stored using reasonable security measures and we take reasonable steps to secure End User Data.
        By using Shiro you expressly agree to this Agreement. And by using Discord you expressly agree to Discord’s [Terms of Service](https://discordapp.com/terms), [Guidelines](https://discordapp.com/guidelines) and [Privacy Policy](https://discordapp.com/privacy).
        *“End User Data” means all data associated with the content within the functionality enabled by the Discord API, including but not limited to message content, message metadata, voice data and voice metadata.*
      `);
    await msg.embed(embed);
	}
};