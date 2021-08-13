const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const line = require('../../assets/json/pickuplines.json');

module.exports = class PickupLineCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pickup-line',
			aliases: ['pickup'],
			group: 'random-response',
			memberName: 'pickup-line',
			description: 'Get a random pick up line!'
		});
	}

	run(msg) {
      	const embed = new MessageEmbed()
			.setTitle('__**Your pickupline:**__')
			.setDescription(`💖 | ${line[Math.round(Math.random() * (line.length - 1))]}`)
			.setColor('RANDOM');
    	return msg.embed(embed);
	}
};