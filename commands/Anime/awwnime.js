const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
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
    try {
      randomPuppy('awwnime')
      .then(url => {
        const embed = new MessageEmbed()
          .setFooter(`awwnime`)
          .setDescription(`[Image URL](${url})`)
          .setImage(url)
          .setColor('RANDOM')
        return message.channel.send({ embed })
      })
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Awwnime;