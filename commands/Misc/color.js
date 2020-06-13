// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');

class Color extends Command {
  constructor(client) {
    super(client, {
      name: "color",
      description: "Shows a random color or a preview of the given color!",
      category: "Misc",
      usage: "color [Color]",
      aliases: ["hex"]
    });
  }

  async run(message, args, level, settings) {
        const color = message.content.split(/\s+/g).slice(1).join(" ");

        if (!color) {
            let genColour = '#' + Math.floor(Math.random() * 16777215).toString(16);
            const embed = new RichEmbed()
                .setColor(genColour)
                .setImage(`https://dummyimage.com/50/${genColour.slice(1)}/&text=%20`)
                .setFooter(genColour);
            return message.channel.send('Here\'s your color!', { embed: embed });
        }

        if (((color.indexOf("#") === 0) && color.length === 7) || (!isNaN(color) && color.length <= 8 && color < 16777215)) {
            const embed = await new RichEmbed()
                .setColor(color)
                .setImage(`https://dummyimage.com/50/${color.slice(1)}/&text=%20`)
                .setFooter(color);
            return message.channel.send({ embed });

        } else {
            return message.channel.send("🚫 | Invalid Parameters!");
        }
    }
}

module.exports = Color;