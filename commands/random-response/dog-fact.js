const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const dogFacts = require('../../assets/json/dog-fact.json');

module.exports = class DogFactCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dog-fact',
			aliases: ['puppy-fact'],
			group: 'random-response',
			memberName: 'dog-fact',
			description: 'Shows a random fact about dogs.'
		});
	}

	run(msg) {
		const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle('🐶 | __**Dog Fact**__')
      .setDescription(dogFacts[Math.round(Math.random() * (dogFacts.length - 1))])
    return msg.embed(embed);
	}
};