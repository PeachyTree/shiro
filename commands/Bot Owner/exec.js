const Command = require('../../base/Command.js');
const exec = require("child_process").exec;

class Exec extends Command {
  constructor(client) {
    super(client, {
      name: "exec",
      description: "Evaluates arbitrary JavaScript.",
      category: "Bot Owner",
      usage: "exec <EXPRESSION>",
      permLevel: "Bot Owner"
    });
  }

  async run(message, args) { 
    this.client.logger.warn("⚠️ | Exec command used");

    try {
      exec(`${args.join(" ")}`, (error, stdout) => {
        const response = (error || stdout);
        message.channel.send(`☑️ | Ran command **\`${message.content.slice(6)}\`**:\n\`\`\`${response}\`\`\``, {split: true});
      });
    } catch (error) {
      this.client.logger.error(error.stack);
      return message.channel.send(`An error occurred:\n\```${error.message}\````);
    }
  }
}

module.exports = Exec;
