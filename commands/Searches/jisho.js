const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const wanakana = require('wanakana');

class Jisho extends Command {
  constructor(client) {
    super(client, {
      name: "jisho",
      description: "Searches for Japanese words and kanji on Jisho!",
      category: "Searches",
      usage: "jisho <Word / Kanji / Japanese / Romaji>",
      aliases: ["define", "kanji"]
    });
  }

  async run(message, args) {
    try {
      const word = args.join(" ");

      if (!word) {
        return message.reply("Command Usage: `jisho <Word / Kanji / Japanese / Romaji>`")
      } 

      let query = encodeURI(word);

      const res = await request.get(`https://jisho.org/api/v1/search/words?keyword=${query}`).catch(console.error);
      let jisho = res.body || res.body.toString();

      this.client.logger.log(jisho);
      if (jisho.data.length > 0) {
        let content = jisho.data[0];
        let senses = JSON.stringify(content.senses[0].english_definitions).replace(/\"/g, '').replace(/,/g, '\n');
        senses = senses.substring(1, senses.length - 1);
        senses = senses.replace(/^/gm, '•\u2000');
        senses = senses.replace(/\\/g, "")

        const embed = new MessageEmbed()
          .setAuthor(`${content.japanese[0].word ? content.japanese[0].word : content.japanese[0].reading}`)
          .setColor('RANDOM')
          .setDescription(content.is_common ? '`Common Word`' : '`Not a Common Word`' + `\n[External Link](https://jisho.org/search/${query})`)
          .addField(`❯\u2000\Definition`, `${senses}`)
          .addField(`❯\u2000\Reading`, `•\u2000**Kana:** ${content.japanese[0].reading ? content.japanese[0].reading : '`N/A`'}\n\•\u2000**Romāji:** ${wanakana.toRomaji(content.japanese[0].reading)}`);
        return message.channel.send({ embed });

      } else {
        return message.channel.send(`No search results found for **${query}**!`);
      }
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Jisho;