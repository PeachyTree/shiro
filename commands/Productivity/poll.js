// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');

class Poll extends Command {
  constructor(client) {
    super(client, {
      name: "poll",
      description: "Starts a poll in the current text channel asking users to vote with the specified time. If no time is specified, poll ends in 60 minutes.",
      category: "Productivity",
      usage: "poll <question> [TIME_IN_MINUTES] | [end]"
    });
  }

  async run(message, args, level, settings) { 

    if (!args.length) {
      return message.react('🚫'), message.reply("Command Usage: `poll <question> [TIME_IN_MINUTES] | [end]`")
    }

    let question = args.join(' ');
    let time = args[0]
    if (!time) time == 3.6e+6;

    const embed = new RichEmbed()
      .setColor("RANDOM")
      .setAuthor('Poll Started')
      .setDescription(question)
      .setFooter(`Poll created by ${message.author.username}`);
    let msg = await message.channel.send({ embed });

    await msg.react('✅'); 
    await msg.react('❌');

    message.channel.fetchMessage(msg.id)
    .then(msg => {
      let upVoteCollection = msg.reactions.filter(rx => rx.emoji.name == '✅');
      let upVotes = upVoteCollection.first().count;
      let downVoteCollection = msg.reactions.filter(rx => rx.emoji.name == '❌');
      let downVotes = downVoteCollection.first().count;
      if (args[0] === "end") return msg.delete, message.channel.send(`Poll ended by ${message.author.username}.\nResults: ✅: ${upVotes} votes, ❌: ${downVotes} votes`);
    })
    msg.delete({timeout: time}); 
  }
}

module.exports = Poll;
