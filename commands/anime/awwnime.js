const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = class AwwnimeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'awwnime',
			aliases: ['aww-anime'],
			group: 'anime',
			memberName: 'awwnime',
			description: 'Cute anime girls!'
		});
	}

	async run(msg) {
		try {
      randomPuppy('awwnime')
        .then(url => {
          const embed = new MessageEmbed()
            .setDescription(`[Image URL](${url})`)
            .setImage(url)
            .setColor('RANDOM')
          return msg.embed(embed);
        });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};