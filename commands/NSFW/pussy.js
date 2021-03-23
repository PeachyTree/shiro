const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
const errors = require('../../assets/json/errors');

class Pussy extends Command {
  constructor(client) {
    super(client, {
      name: "pussy",
      description: "Finds.... pussy.. for you.",
      category: "NSFW",
      usage: "pussy"
    });
  }

  async run(message) {
    let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
    if (!message.channel.nsfw) {
      message.react('💢');
      return message.channel.send(errMessage);
    }

    superfetch.get('https://nekos.life/api/v2/img/pussy')
      .end((err, response) => {
        const embed = new MessageEmbed()
          .setTitle("__Pussy__")
          .setImage(response.body.url)
          .setColor('RANDOM')
          .setURL(response.body.url);
        message.channel.send({ embed });
    })
  }
};

module.exports = Pussy;