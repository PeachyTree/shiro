const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { GEM_EMOJI_ID } = process.env;

class ItemShop extends Command {
  constructor(client) {
    super(client, {
      name: "item-shop",
      description: "Buy Items from the Item Shop!",
      category: "Profile",
      usage: "item-shop"
    });
  }

  async run(message) { 

    // This command uses the example of the `buy-item.js` command
    // It uses the same item and amount of Gems, just to show an example
    // To add an item, simply add another Field, and make sure to add it to the buy-item.js command
    // Note that you can add up to 25 items (25 fields)
    
    let bal = db.get(`gems_${message.author.id}`)
    if (bal === null) bal = 0; 
    // If they haven't used this bot yet, or gained any Gems, set their balance to 0

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('__Item Shop__')
      .addField("Apple", `**5** ${GEM_EMOJI_ID}`)
      .addField("Cookie", `**10** ${GEM_EMOJI_ID}`)
      .addField("Cake", `**20** ${GEM_EMOJI_ID}`)
      .setDescription(`You have **${bal}** ${GEM_EMOJI_ID}\nYou can buy items with \`buy-item <item>\` e.g: buy-item ITEM_NAME`)
    message.channel.send({ embed });
  }
}

module.exports = ItemShop;