const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
const errors = require('../../assets/json/errors');

class Lesbian extends Command {
  constructor(client) {
    super(client, {
      name: "lesbian",
      description: "Finds.. lesbian porn..for.. you.",
      category: "NSFW",
      usage: "lesbian"
    });
  }

  async run(message) {

    let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
    if (!message.channel.nsfw) {
        message.react('💢');
        return message.channel.send(errMessage);
    }

    superfetch.get('https://nekos.life/api/v2/img/les')
      .end((err, response) => {
        const embed = new MessageEmbed()
          .setTitle("__Lesbian__")
          .setImage(response.body.url)
          .setColor('RANDOM')
          .setURL(response.body.url);
        message.channel.send({ embed });
    })
  }
};

module.exports = Lesbian;