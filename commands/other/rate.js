const Command = require('../../structures/Command');
const { SHIRO_ID } = process.env;

module.exports = class RateCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rate',
			aliases: ['rate-waifu'],
			group: 'other',
			memberName: 'rate',
			description: 'Gives the item you specify a rating out of 10!',
			args: [
				{
					key: 'item',
					prompt: 'What item do you want me to rate?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { item }) {
    if (item.toUpperCase().startsWith('SHIRO') 
    || item.toUpperCase().startsWith(`<@!${SHIRO_ID}`)) return msg.say('I\'d give myself a 10/10!');
    const rating = Math.floor(Math.random() * 10) + 0;
    return msg.say(`I'd give **${item}** a ${rating}/10!`);
	}
};