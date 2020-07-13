const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const quotes = require('../../assets/json/quotes.json');
const total = Object.keys(quotes).length

class Quote extends Command {
  constructor(client) {
    super(client, {
      name: "quote",
      description: "Gives you a random quote!",
      category: "Fun",
      usage: "quote"
    });
  }

  run(message) {

    let random = Math.floor(Math.random() * total + 1);
    let quote = quotes[random];

    const embed = new MessageEmbed()
      .setAuthor(quote.author)
      .setDescription(quote.quote)
      .setFooter(`Quote Number ${random}`)
      .setColor('RANDOM')
    message.channel.send({ embed });
  }
}

module.exports = Quote;