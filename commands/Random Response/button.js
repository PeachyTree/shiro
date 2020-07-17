const Command = require('../../base/Command.js');
const request = require('node-superfetch');
const cheerio = require('cheerio');

class Button extends Command {
  constructor(client) {
    super(client, {
      name: "button",
      description: "Responds with a random 'Will You Press The Button?' situation.",
      category: "Random Response",
      usage: "button",
      aliases: ["will-you-press-the-button", "press-the-button", "press-button"]
    });
  }

  async run(message) {
    try {
        const { text } = await request.get('https://willyoupressthebutton.com/');
        const $ = cheerio.load(text, { normalizeWhitespace: true });
        const cond = $('div[id="cond"]').first().text().trim();
        const res = $('div[id="res"]').first().text().trim();
        return message.channel.send(`**${cond}** but **${res}**`);
    } catch (err) {
        return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Button;