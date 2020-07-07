const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { GEM_EMOJI_ID } = process.env;

class Profile extends Command {
  constructor(client) {
    super(client, {
      name: "profile",
      description: "Displays your amount of Gems and items you currently own.",
      category: "Economy",
      usage: "profile [@USER_MENTION]",
      aliases: ["user-card", "user-profile", "social", "money", "balance", "bal"]
    });
  }

  async run(message, args, level, settings) { 

    let user = message.mentions.users.first() || message.author;
    let money = await db.get(`gems_${user.id}`);
    if (money === null) money = 0;

    let items = await db.get(`items_${user.id}`);
    if (items === null) items = 'No Items yet.';

    if (user.id == this.client.id) return;

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setThumbnail(user.displayAvatarURL)
      .setTitle(`__**${user.username}'s Profile**__`)
      .addField('Gems', `${money} ${GEM_EMOJI_ID}`)
      .addField('Items', `${items}`)
    message.channel.send({ embed }); 
  }
}

module.exports = Profile;