const Command = require('../../structures/Command');
const request = require('node-superfetch');
const cheerio = require('cheerio');

module.exports = class ButtonCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'button',
			aliases: ['will-you-press-the-button', 'press-the-button', 'press-button'],
			group: 'random-response',
			memberName: 'button',
			description: 'Responds with a random \'Will You Press The Button?\' situation.'
		});
	}

	async run(msg) {
		try {
      const { text } = await request.get('https://willyoupressthebutton.com/');
      const $ = cheerio.load(text, { normalizeWhitespace: true });
      const cond = $('div[id="cond"]').first().text().trim();
      const res = $('div[id="res"]').first().text().trim();
      return msg.say(`**${cond}** but **${res}**`);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};