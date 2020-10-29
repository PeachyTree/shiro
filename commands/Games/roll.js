const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const { GEM_EMOJI_ID } = process.env;

const recentUsers = new Set();

class Roll extends Command {
  constructor(client) {
    super(client, {
      name: "roll",
      description: "Bet of the outcome of rolling a dice.",
      category: "Games",
      usage: "roll <one / two / three / four / five / six>"
    });
  }

  async run(message, args) { 

    if (!args.length) {
      return message.reply("Command Usage: `roll < one / two / three / four / five / six >`")
    }

      let argsoutcome = args[0];
      let outcomes = [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six'
      ];
      let outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

      let result;
      if (outcome.toLowerCase() === argsoutcome.toLowerCase()) {
        result = 'Congratulations! You won the bet.';
      } else {
        result = 'Sorry, you lost the bet. Better luck next time.';
      }

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Rolled: ${outcome}:`)
        .setDescription(result)
      await message.channel.send({ embed
      }).catch(e => {
        this.client.logger.error(e);
        return message.channel.send(`An error occurred:\n\```${error.message}\````);
      });
    }
  };
}

module.exports = Roll;
