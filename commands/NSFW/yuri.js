const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
const errors = require('../../assets/json/errors');

class Yuri extends Command {
  constructor(client) {
    super(client, {
      name: "nsfwcommands",
      description: "Finds... yuri.. for you.",
      category: "NSFW",
      usage: "yuri"
    });
  }

  async run(message) {
    let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
    if (!message.channel.nsfw) {
      message.react('💢');
      return message.channel.send(errMessage);
    }

    superfetch.get('https://nekos.life/api/v2/img/yuri')
      .end((err, response) => {
        const embed = new MessageEmbed()
          .setTitle("__Yuri__")
          .setImage(response.body.url)
          .setColor('RANDOM')
          .setURL(response.body.url);
        message.channel.send({ embed });
    })
  }
};

module.exports = Yuri;