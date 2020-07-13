const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const xkcd = require('xkcd');
const getRandomInt = require("../../util/Utils");

class XKCDComic extends Command {
  constructor(client) {
    super(client, {
      name: "xkcd",
      description: "Searches for a comic on xkcd.",
      category: "Searches",
      usage: "xkcd [ latest | comic_number ]",
      aliases: ["comic"]
    });
  }

  async run(message, args) { 

    let latest = args.join(" ");
    let number = args.slice(latest).join(" ");

    if (latest) {
      await xkcd((data) => {
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`__**${data.title}**__`)
          .setDescription(data.alt)
          .setURL(`https://xkcd.com/${data.num}`)
          .addField("Comic Number", data.num, true)
          .addField("Publication Date", new Date(data.year, data.month, data.day).toDateString(), true)
          .setImage(data.img)
          .setFooter("Powered by xkcd")
        message.channel.send({ embed
        }).catch(e => {
          this.client.logger.error(e);
          return message.channel.send(`An error occurred: \`${e.message}\``);
        });
      });
    }
    else {
      await xkcd((data) => {
        let comicNumber;
        if (number && !isNaN(number)) {
          comicNumber = number > data.num ? data.num : number;
        }
        else {
          comicNumber = getRandomInt(1, data.num);
          comicNumber = Number.random(1, data.num);
        }

        xkcd(comicNumber, (data) => {
          const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`__**${data.title}**__`)
            .setDescription(data.alt)
            .setURL(`https://xkcd.com/${data.num}`)
            .addField("Comic Number", data.num, true)
            .addField("Publication Date", new Date(data.year, data.month, data.day).toDateString(), true)
            .setImage(data.img)
            .setFooter("Powered by xkcd")
          message.channel.send({ embed
          }).catch(e => {
            this.client.logger.error(e);
            return message.channel.send(`An error occurred: \`${e.message}\``);
          });
        });
      });
    }
  };
}

module.exports = XKCDComic;