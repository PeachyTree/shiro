const Command = require("../../base/Command.js");
const facts = require('../../assets/json/celestia-fact');

class CelestiaFact extends Command {
  constructor(client) {
    super(client, {
      name: "celestia-fact",
      description: "Sends a fact about the bot.",
      category: "Random Response",
      usage: "celestia-fact",
      aliases: ["bot-fact"]
    }); 
  }

  async run(message) { 
    let fact = facts[Math.round(Math.random() * (fact.length - 1))];
    return message.channel.send(fact);
  }
}

module.exports = CelestiaFact;