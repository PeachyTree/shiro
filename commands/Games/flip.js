const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');

class Flip extends Command {
  constructor(client) {
    super(client, {
      name: "flip",
      description: "Bet where a coin lands on!",
      category: "Games",
      usage: "flip <heads / tails>"
    });
  }

  async run(message, args) { 

    if (!args.length) {
      return message.reply("Command Usage: `flip < heads / tails >`")
    }

      let argsoutcome = args[0];
      let outcomes = [
        'Heads',
        'Tails'
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
        .setTitle(`Flipped ${outcome}`)
        .setDescription(result)
      await message.channel.send({ embed
      }).catch(e => {
        this.client.looger.error(e);
        return message.channel.send(`An error occurred:\n\```${error.message}\````);
      });
    }
  };
}

module.exports = Flip;
