const Command = require('../../base/Command.js');
const request = require('node-superfetch');

class NumberFact extends Command {
  constructor(client) {
    super(client, {
      name: "number-fact",
      description: "Responds with a random fact about a specific number.",
      category: "Random Response",
      usage: "number-fact <Number>"
    });
  }

  async run(message) {
    try {
        const number = args[0];
        if (!number) return message.channel.send("Command Usage: `number-fact <Number>`");
        const { text } = await request.get(`http://numbersapi.com/${number}`);
        return message.channel.send(text);
    } catch (err) {
        if (err.status === 404) return message.channel.send('Could not find any results.');
        return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = NumberFact;