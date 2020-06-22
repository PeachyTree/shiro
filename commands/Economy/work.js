const Command = require('../../base/Command.js');
const db = require('quick.db');
const talkedRecently = new Set();

class Work extends Command {
  constructor(client) {
    super(client, {
      name: "work",
      description: "Work for a chance to earn Money!",
      category: "Economy",
      usage: "work",
      aliases: ["earn-money"]
    });
  }

  async run(message, args, level, settings) { 

    if (talkedRecently.has(message.author.id)) {
      message.reply("You can only use this command once every 3 hours! Wait 3 hours before using this again!");

    } else {
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 1.08e+7); // 3 hours cooldown to prevent users to cheat.

      let reward = 0 || 10 || 25 || 50 || 75 || 100 || 250 || 500;
        
      if (reward == 0) return message.channel.send('Sadly you did not do your job well.. so you earned nothing!')

      message.channel.send(`You earned **${reward}**!`)
      db.add(`money_${message.author.id}`, reward);
    }
  }
}

module.exports = Work;