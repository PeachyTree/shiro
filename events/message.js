// This is the message event. It runs anytime the bot receives a message.
// For setting up the prefix, args, level up message and settings!

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {

    if (message.author.bot) return;

    if (message.channel.type === "text" && !message.guild.me.hasPermission("SEND_MESSAGES")) return;

    const settings = message.guild ? this.client.getSettings(message.guild) : this.client.getSettings("default");

    message.settings = settings;

    // If someone mentions the bot in a text channel, it'll automatically send a reply with how to use it:
    const mention = `<@${this.client.user.id}>`; // = This Client ID
    if (message.content.startsWith(mention)) {
      message.channel.send(`First time using Shiro? Need help getting started? Simply forgotten how to use this bot?\nUse the \`s.help\` command!`);
    }

    if (message.content.indexOf(settings.prefix) !== 0) return;

    // Command settings
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const level = this.client.permlevel(message);
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

    if (!cmd) return;

    if (cmd && !message.guild && cmd.conf.guildOnly)
      return message.channel.send('This command is unavailable via direct message. Please run this command in a guild (server).');

    if (cmd && cmd.conf.enabled === false)
      return message.channel.send('This command is unavailable as it has been temporarily disabled, or is still in development.');


    // Permission Level detctors
    if (level < this.client.levelCache[cmd.conf.permLevel]) {
      if (settings.systemNotice.toLowerCase() === "true") { 
        // If a person has a lower level than a command requires, it'll let them know:
        return message.channel.send(`You do not have permission to use this command.\nYour permission level is ${level} (${this.client.config.permLevels.find(l => l.level === level).name}), and this command requires level ${this.client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel}).`);
      } else {
        return;
      }
    }
    
    message.author.permLevel = level;

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }
    
    // Logs whenever a user runs a command
    this.client.logger.log(`${this.client.config.permLevels.find(l => l.level === level).name} ${message.author.tag} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
    cmd.run(message, args, level, settings); // Command handler values
  }
};
