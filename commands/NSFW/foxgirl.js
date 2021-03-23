const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
const errors = require('../../assets/json/errors');

class FoxGirl extends Command {
  constructor(client) {
    super(client, {
      name: "foxgirl",
      description: "Finds... foxgirls.. for you.",
      category: "NSFW",
      usage: "foxgirl",
      aliases: ['f-girl']
    });
  }

  async run(message) {

    let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
    if (!message.channel.nsfw) {
      message.react('💢');
      return message.channel.send(errMessage);
    }

    superfetch.get('https://nekos.life/api/v2/img/fox_girl')
      .end((err, response) => {
        const embed = new MessageEmbed()
          .setTitle("__Fox Girl__")
          .setImage(response.body.url)
          .setColor('RANDOM')
          .setURL(response.body.url);
        message.channel.send({ embed });
    })
  }
};

module.exports = FoxGirl;