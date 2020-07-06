const Command = require('../../base/Command.js');

class Choose extends Command {
  constructor(client) {
    super(client, {
      name: "choose",
      description: "Choose an item from a list you provide.",    
      category: "Productivity",
      usage: "choose <option1;option2> [option3[...]]"
    });
  }

  run(message, args) { 

    if (!args.length) {
      return message.reply("Command Usage: `choose <option1;option2> [option3[...]]`")
    }

    const randomNumber = Math.floor(Math.random() * (args.length - 0) + 0);

    return message.reply(`I choose #${randomNumber + 1}, ${args[randomNumber]}`);
  }
};

module.exports = Choose;