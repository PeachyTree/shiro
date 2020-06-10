// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const subreddits = [
  "memes",
  "DeepFriedMemes",
  "bonehurtingjuice",
  "surrealmemes",
  "dankmemes",
  "meirl",
  "me_irl",
  "funny"
]

class Meme extends Command {
  constructor(client) {
    super(client, {
      name: "meme",
      description: "Searches for a random meme from selected subreddits!\nWarning: There is no NSFW filter on this!",
      category: "Searches",
      usage: "meme",
    });
  }

  async run(message, args, level, settings) {
    let randSubreddit = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(randSubreddit)
    .then(url => {
      const embed = new RichEmbed()
        .setFooter(`${randSubreddit}`)
        .setDescription(`[Image URL](${url})`)
        .setImage(url)
        .setColor('RANDOM');
      return message.channel.send({ embed });
    })
  }
}

module.exports = Meme;