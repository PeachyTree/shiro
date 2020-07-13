const Command = require('../../base/Command.js');
const fetch = require("node-superfetch");

class Joke extends Command {
  constructor(client) {
    super(client, {
      name: "joke",
      description: "Tells a general or programming-related joke.",
      category: "Fun",
      usage: "joke",
    });
  }

  async run(message) { 
    fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => message.channel.send(`${data.setup} ${data.punchline}`))
    .catch(error => {
      this.client.logger.error(error);
      return message.channel.send(`An error occurred:\n\```${error.message}\````);
    });
  }
}

module.exports = Joke;
