const Command = require("../../base/Command.js");
const { request } = require("node-superfetch");

class LoremIpsum extends Command {
    constructor(client) {
      super(client, {
        name: "loremipsum",
        description: "Need placeholder text for your website? Look no further.",
        category: "Random Response",
        usage: "loremipsum",
        aliases: ["placeholder", "lorem", "lorem-ipsum"]
      });
    }

    async run(message) { 
        try {
          const { raw } = await request("https://loripsum.net/api").set("Accept", "text/plain");
          const text = raw.toString();
          message.channel.send(text.length >= 2000 ? text.substring(0, 1980) + "... </p>" : text, { code: "html" });
        } catch (err) {
          return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
        }
    }
}

module.exports = LoremIpsum;
