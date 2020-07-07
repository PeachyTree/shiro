const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const { GEM_EMOJI_ID } = process.env;

const recentUsers = new Set();

class Slots extends Command {
  constructor(client) {
    super(client, {
      name: "slots",
      description: "Bet Gems on spinning the slot machine! You win if all 3 reels stop at the same emojis. There's also a grand prize if all 3 reels stop at :moneybag:!",
      category: "Economy",
      usage: "slots <Amount>",
      aliases: ["slot-machine", "betslots"]
    });
  }

  async run(message, args, level, settings) { 

    let cooldown = 3.6e+6;
    // 1 hour cooldown as in flip/roll to prevent uses from cheating.

    if (!args.length) {
      return message.reply("Command Usage: `slots <Amount>`")
    }

    if (recentUsers.has(message.author.id)) {
      message.channel.send("You can use this command once every hour.");
    } else {

      let money = args[0]

      let minAmount = 15;
      if (money < minAmount) {
        return message.channel.send(`The minimum amount to bet are 15 ${GEM_EMOJI_ID}.`);
      }

      let maxAmount = 50;
      if (money > maxAmount) {
        return message.channel.send(`The maximum amount to bet are 50 ${GEM_EMOJI_ID}.`);
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

      let result;
      if (reels[0] === reels[1] && reels[1] === reels[2]) {
        let prize = money;

        if (reels[0] === ':moneybag:') prize *= 2;

        result = `Congratulations! You won the bet.\nYou won **${prize}** ${GEM_EMOJI_ID}.`;

        db.add(`gems_${message.author.id}`, prize)

      } else {
        let prize = money;
        result = `Sorry, you lost the bet (and ${prize} ${GEM_EMOJI_ID}). Better luck next time.`;

        db.subtract(`gems_${message.author.id}`, prize)
      }

      const embed = new MessageEmbed()
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