const Command = require("../Command");
const request = require("node-superfetch");

class Lizard extends Command {
  constructor(client) {
    super(client, {
      name: "lizard",
      description: "Sends a random image of a lizard.",
      category: "Random Image",
      usage: "lizard"
    });
  }

  async run(message) { 
    const { body } = await request.get('https://nekos.life/api/v2/img/lizard');
    return message.channel.send({ files: [body.message] });
  }
}

module.exports = Lizard;