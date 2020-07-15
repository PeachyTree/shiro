const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const waifus = require('../../assets/json/waifus.json');
const total = Object.keys(waifus).length

class Waifu extends Command {
  constructor(client) {
    super(client, {
      name: 'waifu',
      description: `Finds you a waifu from a database of ${total} waifus!\nOthers can vote on the waifu through reactions!`,
      category: 'Anime',
      usage: 'waifu [Number]',
      aliases: ['waif']
    });
  }

  async run(message, args) {
    try {
      let waifuNumber = args.join(" ");
      if (waifuNumber <= total && waifuNumber > 0) return message.channel.send(`That's not a valid waifu number! There are only **${total}** waifus right now, *choose a number between 1 and ${total}*!`);

      if (!waifuNumber) {
        let random = Math.floor(Math.random() * total + 1);
        let waifu = waifus[random];

        const embed = new MessageEmbed()
          .setAuthor(waifu.name, waifu.image)
          .setDescription(waifu.origin)
          .setImage(waifu.image)
          .setFooter(`Waifu Number ${random}`)
          .setColor('#FAC193');
        let ms = await message.channel.send(`💝 | **${waifu.name}**? `, { embed });
        await ms.react('👍');
        await ms.react('👎');

        return null;

        } else if (waifuNumber) {
          let waifu = waifus[waifuNumber]
          const embed = new MessageEmbed()
            .setAuthor(waifu.name, waifu.image)
            .setDescription(waifu.origin)
            .setImage(waifu.image)
            .setFooter(`Waifu Number ${waifuNumber}`)
            .setColor('#FAC193');
          let ms = await message.channel.send(`💝 | Here's waifu number **${waifuNumber}**!`, { embed });
          await ms.react('👍');
          await ms.react('👎');

          return null;
        }
      } catch (err) {
        return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
      }
    }
}

module.exports = Waifu;
