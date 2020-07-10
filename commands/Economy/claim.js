const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const parseMilliseconds = require('parse-ms');

class Claim extends Command {
  constructor(client) {
    super(client, {
      name: "claim",
      description: "Claim your daily rewards.",
      category: "Economy",
      usage: "claim",
      aliases: ["daily", "claim-daily"]
    });
  }

  async run(message) { 

    let dailyCooldown = 8.64e+7; // = 24 hours in ms

    let lastDaily = await db.get(`dailyRewardInfo_${message.author.id}.lastDaily`); 

    if ((lastDaily !== null) && (dailyCooldown - (Date.now() - lastDaily) > 0)) {
      let remainingTime = parseMilliseconds(dailyCooldown - (Date.now() - lastDaily));

      // If the user already collected their reward earlier, send this:
      message.channel.send(`You already collected your reward! You can use this command again in **${remainingTime.hours}h ${remainingTime.minutes}min**`);

    } else { // If not, continue, and give them their reward for today:

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`__**${message.author.username}'s Daily Reward**__`)
        .addField(`Reward Collected`, `5 Gems`)
      message.channel.send({ embed }); 

      // Sets the daily reward
      db.set(`dailyRewardInfo_${message.author.id}.lastDaily`, Date.now());
      // Adds the money to the author 
      db.add(`gems_${message.author.id}`, 5); 
    }
  }
}

module.exports = Claim;