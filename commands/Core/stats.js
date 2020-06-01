// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const { version } = require('../../package');
const moment = require("moment");
require("moment-duration-format");

class Stats extends Command {
  constructor(client) {
    super(client, {
      name: "stats",
      description: "Shows some information about Celestia!",
      category: "Core",
      usage: "c.stats",
      aliases: ["botinfo"]
    });
  } 

  async run(message, args, level, settings) { 
    const duration = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    const msg = await message.channel.send("🔄 | Fetching bot stats...");
    const embed = new RichEmbed()
      .setTitle("__**Celestia Bot Stats**__")
      .setColor('RANDOM')
      .addField(':clock4: | **Uptime**', `${duration}`, true)
      .addField(':bar_chart: | **Server Count**', `${this.client.guilds.size.toLocaleString()}` , true)
      .addField(':chart_with_upwards_trend: | **User Count**', `${this.client.users.size.toLocaleString()}`, true)
      .addField(':card_box: | **Channel Count**', `${this.client.channels.size.toLocaleString()}`, true)
      .addField(':chart_with_downwards_trend: | **Memory Usage**', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
      .addField(':page_facing_up: | **Version**', `v${version}`, true)
      .addField(':bookmark_tabs: | **latest release notes**', `**Use the \`${settings.prefix}changelog\` command to view all recent changes.**`, true)
    await msg.edit({ embed });
    
  }
}

module.exports = Stats;
