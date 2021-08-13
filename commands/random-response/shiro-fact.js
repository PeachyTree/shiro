const Command = require('../../structures/Command');
const facts = require('../../assets/json/shiro-fact');

module.exports = class ShiroFactCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'shiro-fact',
			aliases: ['bot-fact'],
			group: 'random-response',
			memberName: 'shiro-fact',
			description: 'Sends a fact about the bot.'
		});
	}

	run(msg) {
		let fact = facts[Math.round(Math.random() * (fact.length - 1))];
    return msg.say(fact);
	}
};