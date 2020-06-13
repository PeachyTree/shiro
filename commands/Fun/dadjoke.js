// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require("../../base/Command.js");
const fetch = require("node-fetch");

class DadJoke extends Command {
    constructor(client) {
      super(client, {
        name: "dadjoke",
        description: "Sends a random dad joke.",
        category: "Fun",
        usage: "dadjoke",
        aliases: ["dad", "dadj", "badjoke"]
      });
    }

    async run(message, args, level, settings) { 
      const meta = { "Accept": "text/plain" };

      fetch("https://icanhazdadjoke.com/", { headers: meta })
        .then(res => res.text())
        .then(body => message.channel.send(body))
        .catch(error => {
          this.client.logger.error(error);
          return message.channel.send(`🚫 | An Error occurred: ${error.message}`);
        });
    }
}

module.exports = DadJoke;
