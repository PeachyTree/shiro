const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const leveling = require('discord-leveling');
const { GEM_EMOJI_ID } = process.env;

class Profile extends Command {
  constructor(client) {
    super(client, {
      name: "profile",
      description: "Displays your amount of Gems and items you currently own.",
      category: "Profile",
      usage: "profile [@USER_MENTION]",
      aliases: ["user-card", "user-profile", "social", "money", "balance", "bal", "level", "items"]
    });
  }

  async run(message) { 
    try {
      let user = message.mentions.users.first() || message.author;
 
      // Fetch user's balance & items
      let money = await db.get(`gems_${user.id}`);
      if (money === null) money = 0;

      let items = await db.get(`items_${user.id}`);
      if (items === null) items = 'No Items yet.';

      // Show level and level progress
      // Definitely not the *most efficient* way, but the most simple one and it works! :P
      let barPer;
      const currentLevel = await leveling.Fetch(user.id);
  
      if (currentLevel.xp == 0) barPer = "0" 
      if (currentLevel.xp == 10) barPer = "5" 
      if (currentLevel.xp == 20) barPer = "10" 
      if (currentLevel.xp == 30) barPer = "15" 
      if (currentLevel.xp == 40) barPer = "20" 
      if (currentLevel.xp == 50) barPer = "25" 
      if (currentLevel.xp == 60) barPer = "30" 
      if (currentLevel.xp == 70) barPer = "35" 
      if (currentLevel.xp == 80) barPer = "40" 
      if (currentLevel.xp == 90) barPer = "45" 
      if (currentLevel.xp == 100) barPer = "50" 
      if (currentLevel.xp == 110) barPer = "55" 
      if (currentLevel.xp == 120) barPer = "60" 
      if (currentLevel.xp == 130) barPer = "65" 
      if (currentLevel.xp == 140) barPer = "70" 
      if (currentLevel.xp == 150) barPer = "75" 
      if (currentLevel.xp == 160) barPer = "80" 
      if (currentLevel.xp == 170) barPer = "85" 
      if (currentLevel.xp == 180) barPer = "90" 
      if (currentLevel.xp == 190) barPer = "95" 
      if (currentLevel.xp == 200) barPer = "99"  

      // Don't return this if the mentioned user is a bot
      // A bot won't have a user profile!
      if (user.id == this.client.id) return;

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(user.displayAvatarURL)
        .setTitle(`__**${user.username}'s Profile**__`)

        // Show their amount og Gems:
        .addField('Gems', `${money} ${GEM_EMOJI_ID}`)

        // Show their current level progress with percentage:
        .addField('Level Progress', `${currentLevel.level} | ${barPer}%`)

        // Show their Items; if they don't have any items,
        // it will be set to 'No items yet'.
        .addField('Items', `${items}`)
      message.channel.send({ embed }); 
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Profile;