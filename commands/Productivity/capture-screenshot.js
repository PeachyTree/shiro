// Credit to dragonfire535 for the optimized and cleaner version of this command
// https://github.com/dragonfire535

const Command = require('../../base/Command.js');
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
    if (args.length !== 0) {
      const { body } = await request.get(`https://image.thum.io/get/width/1920/crop/675/noanimate/${args[0]}`);
      return message.channel.send({ files: [{ attachment: body, name: 'screenshot.png' }] });
    } else {
      return message.reply("Command Usage: `capture-screenshot <URL>`")
    }
  }
};

module.exports = CaptureScreenshot;
