const Command = require("../Command");

class LMGTFY extends Command {
  constructor(client) {
    super(client, {
      name: "lmgtfy",
      description: "Why don't you just... Google it?",
      category: "Other",
      usage: "lmgtfy <Query>",
      aliases: ["google-it"]
    });
  }

  async run(message, args) { 
    try {
      const textQuery = args.join(" ");
      const query = encodeURIComponent(args.join(" "));
      const url = `https://lmgtfy.com/?q=${query}`;

      if (!query) return message.channel.send('Command Usage: `lmgtfy <Query>`');
      else message.channel.send(`"${textQuery}"\n**<${url}>**`);
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = LMGTFY;