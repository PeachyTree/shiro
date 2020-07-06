// If you want to add another item to this buy-item.js command, make sure to also add it to the item-shop 

const Command = require('../../base/Command.js');
const db = require('quick.db');
const { GEM_EMOJI_ID } = process.env;

class BuyItem extends Command {
  constructor(client) {
    super(client, {
      name: "buy-item",
      description: "Buy something from the item shop!",
      category: "Economy",
      usage: "buy-item <item>",
      aliases: ["buy"]
    });
  }

  async run(message, args, level, settings) { 

    const item = args;
    // "gems_" is just an example and can be changed to anyting else, same goes with item above!
    let author = db.get(`gems_${message.author.id}`);

    if (!item.length) {
      return message.reply("Command Usage: `buy-item <item>`")
    } else {
      // Example of an buy-item command:
      // Item name = Item 1
      // Gems = 50
      if(item[0] == 'Item 1') { 
        if (author < 5 /* author = author's balance, 5 = amount of gems */) return message.channel.send(`You need \`5\` ${GEM_EMOJI_ID} to buy this item.`) 
        db.subtract(`gems_${message.author.id}`, 5)
        // If the Author has enough of Gems, subtract it from their balance,
        // and push the item into their balance, which will be visible in the profile.js command.
        db.push(`items_${message.author.id}`, 'item1') // 'item1' is the name of the item the user has bought
        // Send a verification message, that the user successfully bought the item.
        message.channel.send(`You successfully bought this item for \`5\` ${GEM_EMOJI_ID}`)
      } else if(item[0] == 'Item 2') { 
        if (author < 10) return message.channel.send(`You need \`10\` ${GEM_EMOJI_ID} to buy this item.`) 
        db.subtract(`gems_${message.author.id}`, 10)
        db.push(`items_${message.author.id}`, 'item2')
        message.channel.send(`You successfully bought this item for \`10\` ${GEM_EMOJI_ID}`)
      } else if(item[0] == 'Item 3') { 
        if (author < 20) return message.channel.send(`You need \`20\` ${GEM_EMOJI_ID} to buy this item.`) 
        db.subtract(`gems_${message.author.id}`, 20)
        db.push(`items_${message.author.id}`, 'item3')
        message.channel.send(`You successfully bought this item for \`20\` ${GEM_EMOJI_ID}`)
      }
    }
  }
}

module.exports = BuyItem;