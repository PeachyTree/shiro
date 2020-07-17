const Command = require("../../base/Command.js");
const request = require('node-superfetch');
const { THECATAPI_KEY } = process.env;

class Cat extends Command {
  constructor(client) {
    super(client, {
      name: "cat",
      description: "Sends a random image of a cat.",
      category: "Random Image",
      usage: "cat"
    });
  }

  async run(message) { 
    try {
      const { body } = await request
        .get('https://api.thecatapi.com/v1/images/search')
        .query({
          limit: 1,
          mime_types: 'jpg,png'
        })
        .set({ 'x-api-key': THECATAPI_KEY });
      return message.channel.send({ files: [body[0].url] });
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Cat;