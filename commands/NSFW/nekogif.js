const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
const errors = require('../../assets/json/errors');

class NekoGif extends Command {
  constructor(client) {
    super(client, {
      name: "nekogif",
      description: "Finds neko gifs.... for you.",
      category: "NSFW",
      usage: "nekogif"
    });
  }

  async run(message) {
    let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
    if (!message.channel.nsfw) {
      message.react('💢');
      return message.channel.send(errMessage);
    }

    superfetch.get('https://nekos.life/api/v2/img/nsfw_neko_gif')
      .end((err, response) => {
        const embed = new MessageEmbed()
          .setTitle("__Neko Gif__")
          .setImage(response.body.url)
          .setColor('RANDOM')
          .setURL(response.body.url);
        message.channel.send({ embed });
    })
  }
};

module.exports = NekoGif;