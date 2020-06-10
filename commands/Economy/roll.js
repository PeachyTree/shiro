const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const db = require("quick.db");

const recentUsers = new Set();

class Roll extends Command {
  constructor(client) {
    super(client, {
      name: "roll",
      description: "Bet Money on prediction of the outcome of rolling a dice. If you win, you get more of it. But if you lose, you lose the amount you have bet.",
      category: "Economy",
      usage: "roll < one / two / three / four / five / six > <Amount>"
    });
  }

  async run(message, args, level, settings) { 

    let cooldown = 3.6e+6;
    // Same as flip, 1 hour limit to prevent users to cheat.

    if (!args.length) {
      return message.reply("Command Usage: `betroll < one / two / three / four / five / six > <Amount>`")
    }

    if (recentUsers.has(message.author.id)) {
      message.channel.send("You can use this command once every hour.");
    } else {

      let argsoutcome = args[0]
      let money = args[1];

      let minAmount = 75;
      if (money < minAmount) {
        return message.channel.send("The minimum amount to bet is 75.");
      }

      let maxAmount = 325;
      if (money > maxAmount) {
        return message.channel.send("The maximum amount to bet is 325.");
      }

      let outcomes = [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six'
      ];
      let outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

      let userMoney = db.get(`money_${message.author.id}`);

      if (money > userMoney) {
        return message.channel.send("You have less Money than you want to bet.")
      }

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
        .setTitle(`Rolled :${outcome}:`)
        .setDescription(result)
      await message.channel.send({ embed
      }).catch(e => {
        this.client.logger.error(e);
        return message.channel.send(`An error occurred:\n\```${error.message}\````);
      });

      setTimeout(() => {
        recentUsers.splice(recentUsers.indexOf(message.author.id), 1);
      }, cooldown);
    }
  };
}

module.exports = Roll;