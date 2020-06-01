// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const waifus = require('../../assets/json/waifus.json');
const total = Object.keys(waifus).length
const weefi = [
    'https://gfycat.com/KindheartedContentIberianmidwifetoad',
    'http://i.imgur.com/U25HMyz.gifv',
    'http://i.imgur.com/0xhBPbR.gif',
    'Your waifu is me...right?',
    'https://media.giphy.com/media/2PW8oTlHnVaZa/giphy.gif',
    'https://thumbs.gfycat.com/BiodegradableWillingIchneumonfly-max-1mb.gif',
    'https://i.makeagif.com/media/10-19-2015/PyKTt9.gif',
    'https://i.imgur.com/hn0YsNQ.gif',
    'https://media.giphy.com/media/xUA7aVR8tUqIHdAjPa/giphy.gif',
    'http://i0.kym-cdn.com/photos/images/original/001/203/473/1cd.gif',
    'https://media1.tenor.com/images/0e6d6a8f61b84b1ea6cdb13522a39753/tenor.gif?itemid=5237833',
    'https://i.imgur.com/5XuI7W8.gif',
    'http://i.imgur.com/usJbYkw.gif'
]

class Waifu extends Command {
  constructor(client) {
    super(client, {
      name: 'waifu',
      description: `Finds you a waifu from a database of ${total} waifus!\nOthers can vote on the waifu through reactions!\n\Also #119 is best girl.`,
      category: 'Anime',
      usage: 'c.waifu [Number]',
      aliases: ['waif']
    });
  }

  async run(message, args, level, settings) {

        let waifuNumber = message.content.split(/\s+/g).slice(1).join(" ");
        if (waifuNumber <= total && waifuNumber > 0) return message.channel.send(`That's not a valid waifu number! There are only **${total}** waifus right now, *choose a number between 1 and ${total}*!`);

        const percentage = Math.random()
        if (!waifuNumber) {
            let random = Math.floor(Math.random() * total + 1);
            let waifu = waifus[random];

            const embed = new RichEmbed()
                .setAuthor(waifu.name, waifu.image)
                .setDescription(waifu.origin)
                .setImage(waifu.image)
                .setFooter(`Waifu Number ${random}`)
                .setColor('#FAC193');
            let ms = await message.channel.send(`💝 | **${waifu.name}**? `, { embed: embed });
            await ms.react('👍');
            await ms.react('👎');

            return null;

        } else if (waifuNumber) {
            let waifu = waifus[waifuNumber]
            const embed = new RichEmbed()
                .setAuthor(waifu.name, waifu.image)
                .setDescription(waifu.origin)
                .setImage(waifu.image)
                .setFooter(`Waifu Number ${waifuNumber}`)
                .setColor('#FAC193');
            let ms = await message.channel.send(`💝 | Here's waifu number **${waifuNumber}**!`, { embed: embed });
            await ms.react('👍');
            await ms.react('👎');

            return null;

        } else if (percentage < 0.05) {
            return message.channel.send(weefi[Math.round(Math.random() * (weefi.length - 1))])
        }
    }
}

module.exports = Waifu;