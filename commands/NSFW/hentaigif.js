const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
const errors = require('../../assets/json/errors');

class HentaiGif extends Command {
  constructor(client) {
    super(client, {
      name: "nsfwcommands",
      description: "Finds hentai gifs.. for you.",
      category: "NSFW",
      usage: "hentaigif"
    });
  }

  async run(message) {
    let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
      if (!message.channel.nsfw) {
        message.react('💢');
        return message.channel.send(errMessage);
      }

      superfetch.get('https://nekos.life/api/v2/img/Random_hentai_gif')
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("__Hentai Gif__")
            .setImage(response.body.url)
            .setColor('RANDOM')
            .setURL(response.body.url);
          message.channel.send({ embed });
    })
  }
};

module.exports = HentaiGif;