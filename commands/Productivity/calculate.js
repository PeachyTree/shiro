// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const math = require("mathjs");

class Calculate extends Command {
  constructor(client) {
    super(client, {
      name: "calculate",
      description: "Evaluates/calculates a given mathematical expression.",
      category: "Productivity",
      usage: "calculate <Expression>",
      aliases: ["math", "maths"]
    });
  }

  async run(message, args, level, settings) { 
    let exp = args.join(" ");
    if (!exp) return message.reply('Command Usage: `calculate <Expression>`');
    if (exp.includes("°")) exp = exp.replace(/°/g, "deg");

    const msg = await message.channel.send(`🔄 | Calculating...`);

    try {
      let evaled = math.eval(exp);
      if (isNaN(evaled)) evaled = 'NaN (not a number).';
      if (exp.length + evaled.length > 2000) return message.channel.send(`Output is too long to fit into a message!`);
      
      msg.edit(`${exp} = **${evaled}**`);
    } catch (error) {
      if (error.toString().startsWith("SyntaxError:") || error.message.startsWith("Undefined symbol")) return msg.edit(`**\`SyntaxError:\`** \`${error.message}\``);

      this.client.logger.error(error);
      msg.edit(`An error occurred:\n\```${error.message}\````);
    }
  }
}

module.exports = Calculate;
