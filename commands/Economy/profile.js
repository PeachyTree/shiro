const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const db = require('quick.db');

class Profile extends Command {
  constructor(client) {
    super(client, {
      name: "profile",
      description: "Displays your amount of Money and items you currently own.",
      category: "Economy",
      usage: "profile [@USER_MENTION]",
      aliases: ["user-card", "user-profile", "social", "money", "balance", "bal"]
    });
  }

  async run(message, args, level, settings) { 

    let user = message.mentions.users.first() || message.author;
    let money = await db.get(`money_${user.id}`);
    if (money === null) money = 0;

    let items = await db.get(`items_${user.id}`);
    if (items === null) items = 'No Items yet.';

    if (user.id == this.client.id) return;

    const embed = new RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(user.displayAvatarURL)
      .setTitle(`__**${user.username}'s Profile**__`)
      .addField('Money', `${money}`)
      .addField('Items', `${items}`)
    message.channel.send({ embed }); 
  }
}

module.exports = Profile;