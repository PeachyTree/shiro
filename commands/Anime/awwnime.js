const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');

class Awwnime extends Command {
  constructor(client) {
    super(client, {
      name: "awwnime",
      description: "Cute anime girls!",
      category: "Anime",
      usage: "awwnime"
    });
  }

  async run(message) {
    randomPuppy('awwnime')
    .then(url => {
      const embed = new RichEmbed()
        .setFooter(`awwnime`)
        .setDescription(`[Image URL](${url})`)
        .setImage(url)
        .setColor('RANDOM')
      return message.channel.send({ embed })
    })
  }
}

module.exports = Awwnime;