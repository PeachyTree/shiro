const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
const errors = require('../../assets/json/errors');

class Trap extends Command {
  constructor(client) {
    super(client, {
      name: "trap",
      description: "Finds.. traps.. for you.",
      category: "NSFW",
      usage: "trap"
    });
  }

  async run(message) {
    let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
    if (!message.channel.nsfw) {
      message.react('💢');
      return message.channel.send(errMessage);
    }

    superfetch.get('https://nekos.life/api/v2/img/trap')
      .end((err, response) => {
        const embed = new MessageEmbed()
          .setTitle("__Trap__")
          .setImage(response.body.url)
          .setColor('RANDOM')
          .setURL(response.body.url);
        message.channel.send({ embed });
    })
  }
};

module.exports = Trap;