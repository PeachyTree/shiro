// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const leveling = require('discord-leveling');
const { MessageEmbed } = require('discord.js');

class Leaderboard extends Command {
  constructor(client) {
    super(client, {
      name: "leaderboard",
      description: 'Displays the global level leaderboard!',
      category: "Profile",
      usage: "leaderboard [@USER_MENTION]",
    });
  }

  async run(message) {
   
    if (message.mentions.users.first()) {
 
      let output = await leveling.Leaderboard({
        search: message.mentions.users.first().id
      })
      message.channel.send(`🔢 | The user ${message.mentions.users.first().tag} is number ${output.placement} on my leaderboard!`);
 
    } else {
 
      leveling.Leaderboard({
        limit: 3
        // Shows the best 3 users; can be up to 25
      }).then(async users => { 
 
        if (users[0]) var firstplace = await this.client.fetchUser(users[0].userid) 
        if (users[1]) var secondplace = await this.client.fetchUser(users[1].userid) 
        if (users[2]) var thirdplace = await this.client.fetchUser(users[2].userid) 
 
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setTitle('🔢 | __**My Leaderboard:**__')
          .addField('1 - User:', `${firstplace && firstplace.tag || 'Nobody Yet'}; Level: ${users[0] && users[0].level || 'None'}; EXP: ${users[0] && users[0].xp || 'None'}`)
          .addField('2 - User:', `${secondplace && secondplace.tag || 'Nobody Yet'}; Level: ${users[1] && users[1].level || 'None'}; EXP: ${users[1] && users[1].xp || 'None'}`)
          .addField('3 - User:', `${thirdplace && thirdplace.tag || 'Nobody Yet'}; Level: ${users[2] && users[2].level || 'None'}; EXP: ${users[2] && users[2].xp || 'None'}`)
        message.channel.send({ embed });
      })
    }           
  }
};

module.exports = Leaderboard;