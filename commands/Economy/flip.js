const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const db = require("quick.db");

const recentUsers = new Set();

class Flip extends Command {
  constructor(client) {
    super(client, {
      name: "flip",
      description: "Bet Money on prediction of the outcome of flipping a coin. If you win, you get more of it. But if you lose, you lose the amount you have bet.",
      category: "Economy",
      usage: "flip <heads / tails> <Amount>",
      aliases: ["bet-flip", "bflip"]
    });
  }

  async run(message, args, level, settings) { 

    let cooldown = 3.6e+6; // = 1 hour cooldown
    // This command has a cooldown, so it can't be instantly, to prevent users to cheat.

    if (!args.length) {
      return message.reply("Command Usage: `flip < heads / tails > <Amount>`")
    }

    if (recentUsers.has(message.author.id)) {
      message.channel.send("You can use this command once every hour.");
    } else {

      let argsoutcome = args[0];
      let money = args[1];

      let minAmount = 50;
      if (money < minAmount) {
        return message.channel.send("The minimum amount to bet is 50.");
      }

      let maxAmount = 250;
      if (money > maxAmount) {
        return message.channel.send("The maximum amount to bet is 250.");
      }

      let userMoney = db.get(`money_${message.author.id}`);
      // Checks if the user's balance is equally to their bet,
      // if not, send this:

      if (money > userMoney) {
        return message.channel.send("You have less Money than you want to bet.")
      }

      let outcomes = [
        'Heads',
        'Tails'
      ];
      let outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

      recentUsers.add(message.author.id);

      let result;
      if (outcome.toLowerCase() === argsoutcome.toLowerCase()) {
        let prize = money;
        result = `Congratulations! You won the bet.\nYou won **${prize}**.`;

        db.add(`money_${message.author.id}`, prize)

      } else {
        let prize = money;
        result = 'Sorry, you lost the bet. Better luck next time.';

        db.subtract(`money_${message.author.id}`, prize)
      }

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle(`Flipped ${outcome}`)
        .setDescription(result)
      await message.channel.send({ embed
      }).catch(e => {
        this.client.looger.error(e);
        return message.channel.send(`An error occurred:\n\```${error.message}\````);
      });
      

      setTimeout(() => {
        recentUsers.delete(message.author.id);
      }, cooldown);
    }
  };
}

module.exports = Flip;