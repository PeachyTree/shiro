const Command = require('../../structures/Command');

module.exports = class DiscrimCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'discrim',
			aliases: ['discriminator'],
			group: 'info',
			memberName: 'discrim',
			description: 'Searches for users with the specified discriminator.',
			args: [
				{
					key: 'discrim',
					prompt: 'What user do you want to search for? Name the discriminator of them.',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { discrim }) {
		try {
            if (discrim.startsWith("#")) {
                discrim = discrim.slice(1);
            }
            if (/^[0-9]+$/.test(discrim) && discrim.length === 4) {
                const users = this.client.users.filter(user => user.discriminator === discrim).map(user => user.username);
                if (users.length === 0) return msg.say(`After searching all my servers, no one with the discriminator **#${discrim}** could be found.`);
                return msg.say(`**${users.length}** user(s) found with the discriminator **#${discrim}**:\n\`\`\`yml\n${users.join(", ")}\`\`\``);
            } else {
                return msg.reply('Invalid discriminator provided.');
            }
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};