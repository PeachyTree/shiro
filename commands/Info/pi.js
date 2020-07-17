const Command = require("../../base/Command.js");

class Pi extends Command {
    constructor(client) {
      super(client, {
        name: "pi",
        description: "Returns the value of Pi (π).",
        category: "Info",
        usage: "pi",
        aliases: ["π"]
      });
    }

    async run(message) { 
        message.channel.send(`π = **${Math.PI}**...`);
    }
}

module.exports = Pi;
