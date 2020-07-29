const Command = require("../../base/Command.js");
const { MessageEmbed } = require("discord.js");

class EmojiImage extends Command {
  constructor(client) {
    super(client, {
      name: "emoji-image",
      description: "Sends the specified emoji as an image.",
      category: "Info",
      usage: "emoji-image <Emoji>"
    });
  }

  async run(message, args) { 
    if (!args[0]) return message.reply('Command Usage: `emoji-image <Emoji>`');
    if (args[0].startsWith("<a:")) return message.reply("This command does not support animated emojis yet.");
    if (args[0].charCodeAt(0) >= 55296) return message.reply(`${args[0]} is a regular Discord emoji, from Twemoji.\nhttps://twemoji.twitter.com`);

    const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);
    if (!match || !match[1]) return message.reply('You must provide a valid emoji, from a server I am on.');

    const emoji = this.client.emojis.find(match[1]);
    if (!emoji) return message.reply('You must provide a valid emoji, from a server I am on.');

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(emoji.name)
      .setImage(emoji.url)
    return message.channel.send({ embed });
  }
}

module.exports = EmojiImage;
