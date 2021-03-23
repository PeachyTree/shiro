const Command = require('../Command');
const fortune = require('../../assets/json/fortune.json');

class Fortune extends Command {
  constructor(client) {
    super(client, {
      name: "fortune",
      description: "Get a fortune!",
      category: "Random Response",
      usage: "fortune"
    });
  }

  run(message) { 
    message.channel.send(`🔮 | ${fortune[Math.round(Math.random() * (fortune.length - 1))]}`)
  }
}

module.exports = Fortune;