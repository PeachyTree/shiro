// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const fortune = require('../../assets/json/fortune.json');

class Fortune extends Command {
  constructor(client) {
    super(client, {
      name: "fortune",
      description: "Get a fortune!",
      category: "Fun",
      usage: "c.fortune"
    });
  }

  run(message, args, level, settings) { 
    message.channel.send(`🔮 | ${fortune[Math.round(Math.random() * (fortune.length - 1))]}`)
  }
}

module.exports = Fortune;