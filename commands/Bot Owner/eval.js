const Command = require('../../base/Command.js');

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      description: "Evaluates arbitrary JavaScript.",
      category: "Bot Owner",
      usage: "eval <EXPRESSION>",
      permLevel: "Bot Owner"
    });
  }

  async run(message, args) { 
    this.client.logger.warn("⚠️ | Eval command used");

    const code = args.join(" ");
    try {
      const evaled = eval(code);
      const clean = await this.client.clean(this.client, evaled);
      const MAX_CHARS = 3 + 2 + clean.length + 3;
      if (MAX_CHARS > 2000) {
        return message.channel.send("☑️ | Output exceeded 2000 characters, sending as a file.", { files: [{ attachment: Buffer.from(clean), name: "output.txt" }] });
      }
      message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await this.client.clean(this.client, err)}\n\`\`\``);
    }
  }
}

module.exports = Eval;
