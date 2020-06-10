// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const snekfetch = require('snekfetch');

class Advice extends Command {
  constructor(client) {
    super(client, {
      name: "advice",
      description: "Get some advice!",
      category: "Fun",
      usage: "advice"
    });
  }

  async run(message, args, level, settings) { 
    let res = await snekfetch.get("http://api.adviceslip.com/advice");
    let advice = JSON.parse(res.body)

    try {
      message.channel.send(advice.slip.advice)
    } catch (err) {
      return message.channel.send(`🚫 | My API isn't working!`)
    }
  }
}

module.exports = Advice;