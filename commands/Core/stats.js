const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { version } = require('../../package');
const moment = require("moment");
require("moment-duration-format");

class Stats extends Command {
  constructor(client) {
    super(client, {
      name: "stats",
      description: "Shows some information about Celestia!",
      category: "Core",
      usage: "stats",
      aliases: ["botinfo"]
    });
  } 

  async run(message) { 
    const duration = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    const embed = new MessageEmbed()
      .setTitle("__**Celestia Bot Stats**__")
      .setColor('RANDOM')
      .addField(':clock4: | **Uptime**', `${duration}`, true)
      .addField(':bar_chart: | **Server Count**', `${this.client.guilds.cache.size.toLocaleString()}` , true)
      .addField(':chart_with_upwards_trend: | **User Count**', `${this.client.users.cache.size.toLocaleString()}`, true)
      .addField(':card_box: | **Channel Count**', `${this.client.channels.cache.size.toLocaleString()}`, true)
      .addField(':chart_with_downwards_trend: | **Memory Usage**', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
      .addField(':page_facing_up: | **Version**', `v${version}`, true)
    await message.channel.send({ embed });
    
  }
}

module.exports = Stats;
