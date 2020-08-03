const Command = require('../../base/Command.js');
const db = require('quick.db');
const talkedRecently = new Set();

class Work extends Command {
  constructor(client) {
    super(client, {
      name: "work",
      description: "Work for a chance to earn Gems!",
      category: "Profile",
      usage: "work",
      aliases: ["earn"]
    });
  }

  async run(message) { 
    try {
      if (talkedRecently.has(message.author.id)) {
        message.reply("You can only use this command once every 3 hours! Wait 3 hours before using this again!");

      } else {
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 1.08e+7); // 3 hours cooldown to prevent users to cheat.

        let reward = 0 || 2 || 5 || 10 || 15;
          
        if (reward == 0) return message.channel.send('Sadly you did not do your job well.. so you earned nothing!')

        message.channel.send(`You earned **${reward}** Gems!`)
        db.add(`gems_${message.author.id}`, reward);
      }
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Work;