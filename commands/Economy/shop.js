// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

// This command is not necessarily.
// It's for stuff that can be bought with real money
// If you want to use this to sell anything, as example any roles or permissions,
// Please use this command for it, and not the item-shop.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const db = require("quick.db");

class Shop extends Command {
  constructor(client) {
    super(client, {
      name: "shop",
      description: "Buy stuff with real money, and get cool advantages.",
      category: "Economy",
      usage: "shop",
      aliases: ["real-shop"]
    });
  }
    
  async run(message, args, level, settings) { 
    
    let money = await db.get(`money_${message.author.id}`);
    if (money === null) money = 0;

    const embed = new RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(this.client.displayAvatarURL)
      .setTitle(`__Shop__`)
      .setDescription(`Costs real money | You have **${money}**`)
      .addField('Example Role', `$0.99 (Example, do not actually use this)`, true) 
      // This is just a plain example, so you'll get the idea of it.
      // If you plan on using this, please remove that and replace it with something you want people
      // to buy with real money!
    message.channel.send({ embed });
  }
}
    
module.exports = Shop;