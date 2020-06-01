// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const translate = require('@k3rn31p4nic/google-translate-api');

class Translate extends Command {
  constructor(client) {
    super(client, {
      name: "translate",
      description: "Translates a specific text. A language (e.g. English, German, French, etc.) must be added to specify a language to translate to.",
      category: "Productivity",
      usage: "c.translate <Language> <Text>"
    });
  }

  async run(message, args, level, settings) {
    if (args.length < 2) {
      return message.react('🚫'), message.reply("Command Usage: `translate <Language> <Text>`")
    }

    const result = await translate(args.slice(1).join(' '), { to: args[0] });

    const embed = new RichEmbed()
      .setColor('RANDOM')
      .setDescription(result.text)
      .setFooter(`Translation from ${result.from.language.iso.toUpperCase()} to ${args[0].toUpperCase()}`);
    message.channel.send({ embed });
  }
}

module.exports = Translate;