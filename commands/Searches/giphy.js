// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const fetch = require("node-fetch");
const { URLSearchParams } = require("url");
const { GIPHY_API_KEY } = process.env;

class Giphy extends Command {
  constructor(client) {
    super(client, {
      name: "giphy",
      description: "Returns a GIF from Giphy based on your query.",
      category: "Searches",
      usage: "giphy <Query>",
      aliases: ["gif"]
    });
  }

  async run(message, args, level, settings) { 
    const query = args[0];
    if (!query.length) {
      return message.react('🚫'), message.reply("Command Usage: `giphy <Query>`")
    }
    
    const url = "http://api.giphy.com/v1/gifs/search?";
    const params = new URLSearchParams({
      q: query,
      api_key: GIPHY_API_KEY,
      rating: "pg"
    });
    
    fetch(url + params)
    .then(res => res.json())
    .then(json => message.channel.send(json.data.random().images.original.url))
    .catch(error => {
      this.client.logger.error(error);
      return message.channel.send(`🚫 | An error occurred:\n\```${error.message}\````);
    });
  }
}

module.exports = Giphy;
