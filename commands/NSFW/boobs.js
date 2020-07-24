const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const rp = require('request-promise-native');
const errors = require('../../assets/json/errors');

class Boobs extends Command {
  constructor(client) {
    super(client, {
      name: "boobs",
      description: "Finds.. boobs for you.",
      category: "NSFW",
      usage: "boobs",
      aliases: ['tits']
    });
  }

  async run(message) {
    let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
    if (!message.channel.nsfw) {
      message.react('💢');
      return message.channel.send(errMessage);
    }

    return rp.get('http://api.oboobs.ru/boobs/0/1/random').then(JSON.parse).then(function(res)  {
      return rp.get({
        url:'http://media.oboobs.ru/' + res[0].preview,
        encoding: null
      });
    }).then(function(res) {
      const embed = new MessageEmbed()
        .setTitle("__Boobs__")
        .setColor('RANDOM')
        .setImage("attachment://file.png").attachFiles([{ attachment: res, name: "file.png" }])
      message.channel.send({ embed });
    });
  }
};

module.exports = Boobs;