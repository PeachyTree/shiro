const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");

class EmojiImage extends Command {
    constructor(client) {
      super(client, {
        name: "emoji-image",
        description: "Sends the specified emoji as an image.",
        category: "Info",
        usage: "emoji-image <emoji>",
        aliases: ["emojiimage", "bigemoji", "hugemoji", "hugeemoji"]
      });
    }

    async run(message, args, level, settings) { 
        if (!args[0]) return message.react('🚫'), message.reply('You must provide an emoji for me to look up.');
        if (args[0].startsWith("<a:")) return message.react('🚫'), message.reply(":warning: This command does not support animated emojis yet.");
        if (args[0].charCodeAt(0) >= 55296) return message.react('🚫'), message.reply(`${args[0]} is a regular Discord emoji, from Twemoji.\nhttps://twemoji.twitter.com`);

        const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);
        if (!match || !match[1]) return message.react('🚫'), message.reply('You must provide a valid emoji, from a server I am on.');

        const emoji = this.client.emojis.get(match[1]);
        if (!emoji) return message.react('🚫'), message.reply('You must provide a valid emoji, from a server I am on.');

        const embed = new RichEmbed()
            .setColor('RANDOM')
            .setTitle(emoji.name)
            .setImage(emoji.url)
            .setFooter(`Requested by ${message.author.tag} using ${settings.prefix}emojiimage`, message.author.avatarURL);
        return message.channel.send({ embed });
    }
}

module.exports = EmojiImage;
