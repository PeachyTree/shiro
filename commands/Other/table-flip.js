const Command = require("../../base/Command.js");
const flipFrames = require("../../assets/json/table-flip");

class TableFlip extends Command {
  constructor(client) {
    super(client, {
      name: "table-flip",
      description: "Flips a table, in real-time! (╯°□°)╯",
      category: "Other",
      usage: "table-flip"
    });
  }

  async run(message) { 
    try {
      const msg = await message.channel.send("(\\\\°□°)\\\\  ┬─┬");

      for (const frame of flipFrames) {
        await this.client.wait(300);
        await msg.edit(frame);
      }
      return msg;
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = TableFlip;