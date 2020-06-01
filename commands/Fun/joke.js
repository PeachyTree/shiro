// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const fetch = require("node-fetch");

class Joke extends Command {
  constructor(client) {
    super(client, {
      name: "joke",
      description: "Tells a general or programming-related joke.",
      category: "Fun",
      usage: "c.joke",
    });
  }

  async run(message, args, level, settings) { 
    fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => message.channel.send(`${data.setup} ${data.punchline}`))
    .catch(error => {
      this.client.logger.error(error);
      return message.channel.send(`🚫 | An error occurred:\n\```${error.message}\````);
    });
  }
}

module.exports = Joke;
