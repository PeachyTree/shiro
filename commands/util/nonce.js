const Command = require('../../structures/Command');

module.exports = class NonceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'nonce',
			group: 'bot-owner',
			memberName: 'nonce',
			description: 'Sends a random number string used for checking message delivery.',
			ownerOnly: true,
			guarded: true
		});
	}

	async run(msg) {
    try {
      const ms = await msg.say(msg.nonce);
      msg.edit(`${msg.nonce}\nDelivery time: **${ms.createdTimestamp - msg.createdTimestamp}**ms.`);
    } catch (error) {
      this.client.logger.info(`Message delivery failed in guild '${msg.guild.name}' (${msg.guild.id}).`);
    }
	}
};