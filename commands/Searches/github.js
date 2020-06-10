// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const fetch = require("node-fetch");
const moment = require("moment");

class GitHub extends Command {
  constructor(client) {
    super(client, {
      name: "github",
      description: "Returns information about the specified GitHub repository.",
      category: "Searches",
      usage: "github <Repo-owner> <Repo-name>",
    });
  }

  async run(message, args, level, settings) { 
    let owner = args[0];
    if (!owner.length || !repo.length) {
      return message.react('🚫'), message.reply("Command Usage: `github <repo-owner> <repo-name>`")
    }
    else owner = encodeURIComponent(args[0]);

    
    if (!repo.length) {
      return message.react('🚫'), message.reply("Command Usage: `github <repo-owner> <repo-name>`")
    }
    else repo = encodeURIComponent(args[1]);
    
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
    .then(res => res.json())
    .then(data => {
      const embed = new RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(data.owner.avatar_url)
        .setAuthor("GitHub", "https://vgy.me/B4CvF1.png")
        .setTitle(`__**${data.full_name}**__`)
        .setURL(data.html_url)
        .setDescription(data.description ? data.description : "[No description set]")
        .addField("❯ Created", moment.utc(data.created_at).format("DD/MM/YYYY HH:mm:ss"), true)
        .addField("❯ Last updated", moment.utc(data.updated_at, "YYYYMMDD").fromNow(), true)
        .addField("❯ Stars", data.stargazers_count, true)
        .addField("❯ Forks", data.forks, true)
        .addField("❯ Issues", data.open_issues, true)
        .addField("❯ Language", data.language || "No language", true)
        .addField("❯ License", data.license ? data.license.spdx_id : "Unlicensed", true)
        .addField("❯ Archived?", data.archived.toString().toProperCase(), true)
        .setFooter(`All times are UTC`, message.author.avatarURL)
        .setTimestamp();
      return message.channel.send({ embed });
    })
    .catch(error => {
      if (error.status === 404) return message.channel.send(`🚫 | No search results found.`);
      this.client.logger.error(error);
      return message.channel.send(`🚫 | An error occurred:\n\```${error.message}\````);
    });
  }
}

module.exports = GitHub;
