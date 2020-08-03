// If you want to add another item to this command, make sure to also add it to the item-shop!

const Command = require('../../base/Command.js');
const db = require('quick.db');
const { GEM_EMOJI_ID } = process.env;

class BuyItem extends Command {
  constructor(client) {
    super(client, {
      name: "buy-item",
      description: "Buy something from the item shop!",
      category: "Profile",
      usage: "buy-item <item>",
      aliases: ["buy"]
    });
  }

  async run(message, args) { 
    try {
      const item = args;
      // "gems_" is just an example and can be changed to anyting else, same goes with item above!
      let author = db.get(`gems_${message.author.id}`);

      if (!item.length) {
        return message.reply("Command Usage: `buy-item <item>`")
      } else {
        // Example of an buy-item command:
        // Item name = Apple
        // Gems = 5
        if(item[0] == 'Apple') { 
          if (author < 5 /* author = author's balance, 5 = amount of gems */) return message.channel.send(`You need \`5\` ${GEM_EMOJI_ID} to buy this item.`) 
          db.subtract(`gems_${message.author.id}`, 5)
          // If the Author has enough Gems, subtract it from their balance,
          // and push the item into their profile, which will be visible in the `profile.js` command.
          db.push(`items_${message.author.id}`, 'item1') // 'item1' is the name of the item the user has bought
          // Let them know they successfully bought the item.
          message.channel.send(`You successfully bought this item for \`5\` ${GEM_EMOJI_ID}`)
          // else, if an other item is specified:
        } else if(item[0] == 'Cookie') { 
          if (author < 10) return message.channel.send(`You need \`10\` ${GEM_EMOJI_ID} to buy this item.`) 
          db.subtract(`gems_${message.author.id}`, 10)
          db.push(`items_${message.author.id}`, 'item2')
          message.channel.send(`You successfully bought this item for \`10\` ${GEM_EMOJI_ID}`)
          // You can copy and paste this else loop to add more items.
        } else if(item[0] == 'Cake') { 
          if (author < 20) return message.channel.send(`You need \`20\` ${GEM_EMOJI_ID} to buy this item.`) 
          db.subtract(`gems_${message.author.id}`, 20)
          db.push(`items_${message.author.id}`, 'item3')
          message.channel.send(`You successfully bought this item for \`20\` ${GEM_EMOJI_ID}`)
        }
      }
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = BuyItem;