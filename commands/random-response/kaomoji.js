const Command = require('../../structures/Command');
const kaomojis = require('../../assets/json/kaomoji');

module.exports = class KaomojiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kaomoji',
			aliases: ['emoticon'],
			group: 'random-response',
			memberName: 'kaomoji',
			description: 'Displays a random kaomoji! (´・ω・｀)',
			details: '3000 will definitely be enough to keep you busy! (ｖ｀▽´)ｖ'
		});
	}

	run(msg) {
    let face = kaomojis[Math.round(Math.random() * (kaomojis.length - 1))];
    return msg.say(face);
	}
};