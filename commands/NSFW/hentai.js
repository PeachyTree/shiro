const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
const errors = require('../../assets/json/errors');

class Hentai extends Command {
  constructor(client) {
    super(client, {
      name: "hentai",
      description: "Finds hentai.. for you.",
      category: "NSFW",
      usage: "hentai"
    });
  }

  async run(message) {
    let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
      if (!message.channel.nsfw) {
        message.react('💢');
        return message.channel.send(errMessage);
      }

      superfetch.get('https://nekos.life/api/v2/img/hentai')
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("__Hentai__")
            .setImage(response.body.url)
            .setColor('RANDOM')
            .setURL(response.body.url);
        message.channel.send({ embed });
    })
  }
};

module.exports = Hentai;