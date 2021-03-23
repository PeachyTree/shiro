const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const rp = require('request-promise-native');
const errors = require('../../assets/json/errors');

class Ass extends Command {
  constructor(client) {
    super(client, {
      name: "ass",
      description: "Finds.. ass for you.",
      category: "NSFW",
      usage: "ass",
      aliases: ['butt']
    });
  }

  async run(message) {

    let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
    if (!message.channel.nsfw) {
      message.react('💢');
      return message.channel.send(errMessage);
    }

    return rp.get('http://api.obutts.ru/butts/0/1/random').then(JSON.parse).then(function(res)  {
      return rp.get({
        url:'http://media.obutts.ru/' + res[0].preview,
        encoding: null
      });
    }).then(function(res) {

      const embed = new MessageEmbed()
        .setTitle("__Ass__")
        .setColor('RANDOM')
        .setImage("attachment://file.png").attachFiles([{ attachment: res, name: "file.png" }])
      message.channel.send({ embed });
    });
  }
};

module.exports = Ass;