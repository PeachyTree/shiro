const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const quotes = require('../../assets/json/quotes.json');
const total = Object.keys(quotes).length

class Quote extends Command {
  constructor(client) {
    super(client, {
      name: "quote",
      description: "Gives you a random quote or a quote from your given number!",
      category: "Random Response",
      usage: "quote"
    });
  }

  run(message, args) {

    try {
      if (args[0]) {
        if (args[0] > total) return message.channel.send('This command has 241 quotes, your number was higher than this amount!');
        let quote = args[0];

        const embed = new MessageEmbed()
          .setAuthor(quote.author)
          .setDescription(quote.quote)
          .setFooter(`Quote Number ${args[0]}`)
          .setColor('RANDOM')
        message.channel.send({ embed });
      } else {
        let random = Math.floor(Math.random() * total + 1);
        let quote = quotes[random];

        const embed = new MessageEmbed()
          .setAuthor(quote.author)
          .setDescription(quote.quote)
          .setFooter(`Quote Number ${random}`)
          .setColor('RANDOM')
        message.channel.send({ embed });
      }
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Quote;