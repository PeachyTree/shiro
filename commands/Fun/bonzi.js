// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const Jimp = require('jimp');

class Bonzi extends Command {
  constructor(client) {
    super(client, {
      name: 'bonzi',
      description: 'Makes Bonzi tell an interesting fact!',
      category: 'Fun',
      usage: 'bonzi <Text>]',
      guildOnly: true,
      aliases: ['fact']
    });
  }

  async run(message, args, level, settings) {
        let text = message.content.split(/\s+/g).slice(1).join(" ");

        if (!text) {
            return message.reply('Command Usage: `bonzi <Text>`');
        }

        await message.channel.startTyping()

        let bonzi = await Jimp.read('assets/images/bonzi.png');
        let blank = await Jimp.read('assets/images/blank.png');

        let font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

        blank.resize(175, 120);
        let fact = blank.print(font, 0, 0, text, 175);

        bonzi.composite(fact, 23, 12);
        bonzi.getBuffer(Jimp.MIME_PNG, async(err, buffer) => {
            await message.channel.send({
                files: [{
                    name: 'bonzi.png',
                    attachment: buffer
                }]
            })
            await message.channel.stopTyping()
        })

        return null;
    }
}

module.exports = Bonzi;