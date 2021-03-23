const Command = require('../Command');
const request = require('node-superfetch');

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
  
  async run(message, args) {
    try {
      if (args.length !== 0) {
        const { body } = await request.get(`https://image.thum.io/get/width/1920/crop/675/noanimate/${args[0]}`);
        return message.channel.send({ files: [{ attachment: body, name: 'screenshot.png' }] });
      } else {
        return message.reply("Command Usage: `capture-screenshot <URL>`")
      }
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
};

module.exports = CaptureScreenshot;
