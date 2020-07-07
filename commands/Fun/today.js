const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

class Today extends Command {
  constructor(client) {
    super(client, {
      name: "today",
      description: "Finds a historical event from today!",
      category: "Fun",
      usage: "today"
    });
  }

  async run(message, args, level, settings) { 
    const res = await request.get('http://history.muffinlabs.com/date');
    const data = JSON.parse(res.body)
    const source = data.data['Events']
    const event = source[Math.round(Math.random() * (source.length - 1))]

    const embed = new MessageEmbed()
      .setAuthor(`Historical Event from ${data.date}, ${event.year}`)
      .setColor('RANDOM')
      .setDescription(event.text)
      .addField('❯\u2000\Information', `•\u2000\**Year:** ${event.year}\n\•\u2000\**External Link${event.links.length !== 1 ? 's' : ''}:** ${event.links.map(l => `[${l.title}](${l.link})`).join(', ')}`)
    message.channel.send({ embed });
	}
}

module.exports = Today;