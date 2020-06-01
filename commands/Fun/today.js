// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');

class Today extends Command {
  constructor(client) {
    super(client, {
      name: "today",
      description: "Finds a historical event from today!",
      category: "Fun",
      usage: "c.today"
    });
  }

  async run(message, args, level, settings) { 
    const res = await snekfetch.get('http://history.muffinlabs.com/date')
    const data = JSON.parse(res.body)
    const source = data.data['Events']
    const event = source[Math.round(Math.random() * (source.length - 1))]

    const embed = new RichEmbed()
      .setAuthor(`Historical Event from ${data.date}, ${event.year}`)
      .setColor('RANDOM')
      .setDescription(event.text)
      .addField('❯\u2000\Information', `•\u2000\**Year:** ${event.year}\n\•\u2000\**External Link${event.links.length !== 1 ? 's' : ''}:** ${event.links.map(l => `[${l.title}](${l.link})`).join(', ')}`)
    message.channel.send({ embed });
	}
}

module.exports = Today;