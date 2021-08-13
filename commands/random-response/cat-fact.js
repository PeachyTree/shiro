const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const catFacts = require('../../assets/json/cat-fact.json');

module.exports = class CatFactCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cat-fact',
			aliases: ['kitty-fact', 'meow-fact'],
			group: 'random-response',
			memberName: 'cat-fact',
			description: 'Shows a random fact about cats.'
		});
	}

	run(msg) {
		const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle('🐱 | __**Cat Fact**__')
      .setDescription(catFacts[Math.round(Math.random() * (catFacts.length - 1))])
    return msg.embed(embed);
	}
};