const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class TodayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'today',
			aliases: ['today-in-history'],
			group: 'random-response',
			memberName: 'today',
			description: 'Finds a historical event from today!'
		});
	}

	async run(msg) {
		try {
      const res = await request.get('http://history.muffinlabs.com/date');
      const data = JSON.parse(res.body);
      const source = data.data['Events'];
      const event = source[Math.round(Math.random() * (source.length - 1))];
      const embed = new MessageEmbed()
        .setAuthor(`Historical Event from ${data.date}, ${event.year}`)
        .setColor('RANDOM')
        .setDescription(event.text)
        .addField('❯\u2000\Information', `•\u2000\**Year:** ${event.year}\n\•\u2000\**External Link${event.links.length !== 1 ? 's' : ''}:** ${event.links.map(l => `[${l.title}](${l.link})`).join(', ')}`);
      return msg.embed(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};