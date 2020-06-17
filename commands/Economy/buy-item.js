// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

// If you want to add another item to this buy-item.js command, make sure to also add it to the item-shop 
// For a template to add new items to this command, look at the buttom of this command

const Command = require('../../base/Command.js');
const db = require('quick.db');

class BuyItem extends Command {
  constructor(client) {
    super(client, {
      name: "buy-item",
      description: "Buy something from the item shop!",
      category: "Economy",
      usage: "buy-item <item>",
      aliases: ["buy", "get"]
    });
  }

  async run(message, args, level, settings) { 

    const item = args;
    // "money_" is just an example and can be changed to anyting else, same goes with item above!
    let author = db.get(`money_${message.author.id}`);

    if (!item.length) {
      return message.reply("Command Usage: `buy-item <item>`")
    } else {
      // Example of an buy-item command:
      // Item name = Item
      // Money = 50
      if(item[0] == 'Item') { 
        if (author < 50 /* author = author's balance, 50 = amount of money */) return message.channel.send(`You don\'t have enough Money to buy this item. You need \`50\` to buy this item.`) 
        db.subtract(`money_${message.author.id}`, 50)
        // If the Author has 50 of money, subtract it from their balance,
        // and push the item into their balance, which will be visible in the profile.js command.
        db.push(`items_${message.author.id}`, 'Item')
        // Send a verification message, that the user successfully bought the item.
        message.channel.send(`You successfully bought Item for \`50\``)
      }
    }
  }
}

module.exports = BuyItem;

// Template for adding an item
// Make sure to replace ITEM_NAME with a name for the item of your choice
// and AMOUNT_OF_MONEY with the amount you want the users to have until they can buy it
/*
if(item[0] == 'ITEM_NAME') { 
  if (author < AMOUNT_OF_MONEY) return message.channel.send(`You don\'t have enough Money to buy this item. You need \`AMOUNT_OF_MONEY\` to buy this item.`) 
  db.subtract(`money_${message.author.id}`, AMOUNT_OF_MONEY)
  db.push(`items_${message.author.id}`, 'ITEM_NAME')
  message.channel.send(`You successfully bought Item for \`50\``)
}
*/