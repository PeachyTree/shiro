const Command = require('../../base/Command.js');
const request = require("request").defaults({ encoding: null });
const isURL = require("is-url");
const { RichEmbed } = require('discord.js');

class CaptureScreenshot extends Command {
    constructor(client) {
      super(client, {
        name: "capture-screenshot",
        description: "Captures a screenshot of a given URL.",
        category: "Productivity",
        usage: "capture-screenshot <URL>",
        aliases: ['screenshot']
      });
    }
  
    async run(message, args, level) {
        if (args.length !== 0) {
            message.channel.startTyping();
            const url = isURL(args[0]) ? args[0] : `http://${args[0]}`;
            const screenshot = request(`https://image.thum.io/get/width/1920/crop/675/noanimate/${url}`);
            const embed = new RichEmbed()
                .setColor("RANDOM")
                .setTitle(url)
                .setURL(url)
                .attachFiles([{
                    attachment: screenshot,
                    name: "screenshot.png"
                }])
                .setImage("attachment://screenshot.png");
            message.channel.stopTyping();
            message.channel.send({ embed });
        } else {
            return message.reply("Command Usage: `capture <URL>`")
        }
    }
};

module.exports = CaptureScreenshot;
