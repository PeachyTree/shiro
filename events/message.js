// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {

    if (message.author.bot) return;

    if (message.channel.type === "text" && !message.guild.me.hasPermission("SEND_MESSAGES")) return;

    const settings = message.guild ? this.client.getSettings(message.guild) : this.client.getSettings("default");

    message.settings = settings;

    const mention = `<@${this.client.user.id}>`;
    if (message.content.startsWith(mention)) {
      message.channel.send(`First time using Celestia? Need help getting started? Simply forgotten how to use this bot?\nUse the \`c.help\` command!`);
    }

    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const level = this.client.permlevel(message);
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

    if (!cmd) return;

    if (cmd && !message.guild && cmd.conf.guildOnly)
      return message.channel.send('This command is unavailable via direct message. Please run this command in a guild (server).');

    if (cmd && cmd.conf.enabled === false)
      return message.channel.send('This command is unavailable as it has been temporarily disabled, or is still in development.');

    if (level < this.client.levelCache[cmd.conf.permLevel]) {
      if (settings.systemNotice.toLowerCase() === "true") {
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
    
    this.client.logger.log(`${this.client.config.permLevels.find(l => l.level === level).name} ${message.author.tag} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
    cmd.run(message, args, level, settings);
  }
};
