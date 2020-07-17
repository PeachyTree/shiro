const Command = require('../../base/Command.js');
const request = require('node-superfetch');

class Advice extends Command {
  constructor(client) {
    super(client, {
      name: "advice",
      description: "Get some advice!",
      category: "Random Response",
      usage: "advice"
    });
  }

  async run(message) { 
    const res = await request.get('http://api.adviceslip.com/advice');
    let advice = JSON.parse(res.body)

    try {
      message.channel.send(advice.slip.advice)
    } catch (err) {
      return message.channel.send(`My API isn't working!\n\`${err.message}\``)
    }
  }
}

module.exports = Advice;