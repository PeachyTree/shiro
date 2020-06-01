// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const { RichEmbed, version } = require('discord.js');
const moment = require("moment");
const pkg = require("../package.json");

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {
    let defaultChannel = "";
    guild.channels.forEach((channel) => {
      if(channel.type == "text" && defaultChannel == "") {
        if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
          defaultChannel = channel;
        }
      }
    }) 

    //this.client.user.setActivity(`over ${this.client.guilds.size} servers`, { type: "WATCHING" });

    this.client.logger.log(`New guild has been joined: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`);
    //let lastUpdated = moment('2020-03-08').fromNow(true) 
    let guildOwner = guild.owner;

    const embed = new RichEmbed()
      .setTitle('Hiya! I\'m Celestia. I\'m a bot developed and maintained by Azura Apple#0955.')
      .setColor('RANDOM')
      .setDescription(`You must be the server owner, ${guildOwner}! Somebody invited me to your server **${guild.name}**. My prefix is \`c.\` (but can be changed).\nTo view all commands and information, use the \`c.help\` and \`c.commands\` commands!`)
      .addField('Version:', `v${pkg.version}`)
      //.addField('Last Updated:', `${lastUpdated}`)
      .setFooter(`Made with Discord.js (v${version}) and Node.js (${process.version})`)
    defaultChannel.send({ embed }); 
  } 
}; 
