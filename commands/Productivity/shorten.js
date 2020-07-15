const Command = require('../../base/Command.js');
const request = require('node-superfetch');
const { BITLY_KEY } = process.env;

class Shorten extends Command {
  constructor(client) {
    super(client, {
      name: "shorten",
      description: "Shortens the specified link.",
      category: "Productivity",
      usage: "shorten <URL>",
      aliases: ["shorten-url", "bit-ly"]
    });
  }

  async run(message, args) { 
    try {
      if (!args[0]) return message.reply('Command Usage: `shorten <URL>`');
      const url = args.join(" ");
        const { body } = await request
          .post('https://api-ssl.bitly.com/v4/shorten')
          .send({ long_url: url })
          .set({ Authorization: `Bearer ${BITLY_KEY}` });
        return message.channel.send(body.link);
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Shorten;