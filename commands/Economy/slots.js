const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const db = require("quick.db");

const recentUsers = new Set();

class Slots extends Command {
  constructor(client) {
    super(client, {
      name: "slots",
      description: "Bet Money on slot machine! You win if all 3 reels stop at the same emojis. There's also a grand prize if all 3 reels stop at :moneybag:!",
      category: "Economy",
      usage: "slots <Amount>"
    });
  }

  async run(message, args, level, settings) { 

    let cooldown = 3.6e+6;
    // 1 hour cooldown as in flip/roll to prevent uses from cheating.

    if (!args.length) {
      return message.reply("Command Usage: `betslots <Amount>`")
    }

    if (recentUsers.has(message.author.id)) {
      message.channel.send("You can use this command once every hour.");
    } else {

      let money = args[0]

      let minAmount = 100;
      if (money < minAmount) {
        return message.channel.send("The minimum amount to bet is 100.");
      }

      let maxAmount = 500;
      if (money > maxAmount) {
        return message.channel.send("The maximum amount to bet is 500.");
      }

      recentUsers.add(message.author.id);

      let reel = [
        ':custard:',
        ':candy:',
        ':cake:',
        ':icecream:',
        ':lollipop:',
        ':chocolate_bar:',
        ':moneybag:',
        ':shaved_ice:',
        ':doughnut:',
        ':cookie:',
        ':ice_cream:'
      ];

      let reels = [];
      for (let i = 0; i < 3; i++) {
        reels.push(reel[Math.floor(Math.random() * reel.length)]);
      }

      let result = 'Sorry, you lost the bet. Better luck next time.';
      if (reels[0] === reels[1] && reels[1] === reels[2]) {
        let prize = money;

        if (reels[0] === ':moneybag:') prize *= 2;

        result = `Congratulations! You won the bet.\nYou won **${prize}**.`;

        db.subtract(`money_${message.author.id}`, prize)

      } else {
        let prize = money;
        result = 'Sorry, you lost the bet. Better luck next time.';

        db.subtract(`money_${message.author.id}`, prize)
      }

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle('Slot Machine')
        .setDescription(reels.join(' \u05C0 '))
        .setFooter(`🎰 ${result}`)
      await message.channel.send({ embed });

      setTimeout(() => {
        recentUsers.delete(message.author.id);
      }, cooldown);
    }
  };
}

module.exports = Slots;