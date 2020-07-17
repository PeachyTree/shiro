const Command = require("../../base/Command.js");
const request = require('node-superfetch');

class Dog extends Command {
  constructor(client) {
    super(client, {
      name: "dog",
      description: "Sends a random image of a dog.",
      category: "Random Image",
      usage: "dog"
    });
  }

  async run(message) { 
    const { body } = await request.get('https://dog.ceo/api/breeds/image/random');
    return message.channel.send({ files: [body.message] });
  }
}

module.exports = Dog;