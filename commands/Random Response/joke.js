const Command = require('../../base/Command.js');
const fetch = require("node-superfetch");

class Joke extends Command {
  constructor(client) {
    super(client, {
      name: "joke",
      description: "Tells a general or programming-related joke.",
      category: "Random Response",
      usage: "joke",
    });
  }

  async run(message) { 
    try {
      fetch("https://official-joke-api.appspot.com/random_joke")
      .then(res => res.json())
      .then(data => message.channel.send(`${data.setup} ${data.punchline}`))
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Joke;
