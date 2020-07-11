const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const { GEM_EMOJI_ID } = process.env;

const recentUsers = new Set();

class Flip extends Command {
  constructor(client) {
    super(client, {
      name: "flip",
      description: "Bet Gems on prediction of the outcome of flipping a coin. If you win, you get more of it. But if you lose, you lose the amount you have bet.",
      category: "Games",
      usage: "flip <heads / tails> <Amount>",
      aliases: ["bet-flip", "bflip"]
    });
  }

  async run(message, args) { 

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

      let minAmount = 5;
      if (money < minAmount) {
        return message.channel.send(`The minimum amount to bet are 5 ${GEM_EMOJI_ID}.`);
      }

      let maxAmount = 25;
      if (money > maxAmount) {
        return message.channel.send(`The maximum amount to bet are 25 ${GEM_EMOJI_ID}.`);
      }

      let userMoney = db.get(`money_${message.author.id}`);
      // Checks if the user's balance is equally to their bet,
      // if not, send this:

      if (money > userMoney) {
        return message.channel.send("You have less Gems than you want to bet.")
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
        result = `Congratulations! You won the bet.\nYou won **${prize}** ${GEM_EMOJI_ID}.`;

        db.add(`gems_${message.author.id}`, prize)

      } else {
        let prize = money;
        result = `Sorry, you lost the bet (and ${prize} ${GEM_EMOJI_ID}). Better luck next time.`;

        db.subtract(`gems_${message.author.id}`, prize)
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
      setTimeout(() => {
        recentUsers.delete(message.author.id);
      }, cooldown);
    }
  };
}

module.exports = Flip;