const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const db = require('quick.db');

class ItemShop extends Command {
  constructor(client) {
    super(client, {
      name: "item-shop",
      description: "Buy Items from the Item Shop!",
      category: "Economy",
      aliases: ["items"],
      usage: "item-shop",
    });
  }

  async run(message, args, level, settings) { 

    // This command uses the example of the buy-item.js command
    // It uses the same item and amount of money, just to show an example
    // To add an item, simply add another Field, and make sure to add it to the buy-item.js command
    
    let bal = db.get(`money_${message.author.id}`)
    if (bal === null) bal = 0;// If the user has not used this bot, or gained any money, set their balance to 0

    const embed = new RichEmbed()
      .setColor('RANDOM')
      .setTitle(`__Item Shop__`)
      .addField("Item", `**50**`)
      .setDescription(`You have **${bal}**\nYou can buy items with \`buy-item <item>\` e.g: e!buy-item ITEM_NAME`)
    message.channel.send({ embed });
  }
}

module.exports = ItemShop;