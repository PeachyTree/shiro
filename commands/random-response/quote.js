const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const quotes = require('../../assets/json/quotes.json');
const total = Object.keys(quotes).length;

module.exports = class ExampleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'quote',
			group: 'random-response',
			memberName: 'quote',
			description: 'Gives you a random quote or a quote from your given number!',
			args: [
				{
					key: 'number',
					prompt: 'What number do you want to view a quote from?',
					type: 'string',
					default: '',
					oneOf: quotes
				}
			]
		});
	}

	async run(msg) {
		try {
      if (quote) {
        const embed = new MessageEmbed()
          .setAuthor(quote.author)
          .setDescription(quote.quote)
          .setFooter(`Quote Number ${args[0]}`)
          .setColor('RANDOM')
        return msg.embed(embed);
      } else {
        let random = Math.floor(Math.random() * total + 1);
        let quote = quotes[random];
        const embed = new MessageEmbed()
          .setAuthor(quote.author)
          .setDescription(quote.quote)
          .setFooter(`Quote Number ${random}`)
          .setColor('RANDOM')
        return msg.embed(embed);
      }
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};