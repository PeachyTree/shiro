const Command = require('../Command');
const { MessageEmbed } = require('discord.js');

class Slots extends Command {
  constructor(client) {
    super(client, {
      name: "slots",
      description: "Spin the slot machine! You win if all 3 reels stop at the same emojis.",
      category: "Games",
      usage: "slots",
      aliases: ["slot-machine"]
    });
  }

  async run(message, args) { 
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
        result = 'Congratulations! You won.';
      } else {
        result = 'Sorry, you lost. Better luck next time.';
      }

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Slot Machine')
        .setDescription(reels.join(' \u05C0 '))
        .setFooter(`🎰 ${result}`)
      await message.channel.send({ embed });
    }
  };
}

module.exports = Slots;
