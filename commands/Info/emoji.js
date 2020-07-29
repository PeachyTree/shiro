const Command = require("../../base/Command.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

class Emoji extends Command {
  constructor(client) {
    super(client, {
      name: "emoji",
      description: "Displays information about the specified emoji.",
      category: "Info",
      usage: "emoji <Emoji>",
      aliases: ["emoji-info"]
    });
  }

  async run(message, args) { 
    if (!args[0]) return message.reply('Command Usage: `emoji <Emoji>`');
    if (args[0].startsWith("<a:")) return message.reply("This command does not support animated emojis yet.");
    if (args[0].charCodeAt(0) >= 55296) return message.reply(`${args[0]} is a regular Discord emoji, from Twemoji.\nhttps://twemoji.twitter.com`);

    const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);
    if (!match || !match[1]) return message.reply('You must provide a valid emoji, from a server I am on.');

    const emoji = this.client.emojis.get(match[1]);
    if (!emoji) return message.reply('You must provide a valid emoji, from a server I am on.');

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Emoji Information")
      .setThumbnail(emoji.url)
      .addField("❯ Name", emoji.name, true)
      .addField("❯ ID", emoji.id, true)
      .addField("❯ Created", moment.utc(emoji.createdAt).format("DD/MM/YYYY"), true)
      .addField("❯ From", emoji.guild, true)
    return message.channel.send({ embed });
  }
}

module.exports = Emoji;
