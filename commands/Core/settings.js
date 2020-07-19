const Command = require('../../base/Command.js');

class Settings extends Command {
  constructor(client) {
    super(client, {
      name: "settings",
      description: "Allows you to view or change settings for your server.",
      category: "Core",
      usage: "settings <view | get | edit> <KEY> <VALUE>",
      aliases: ["set"],
      guildOnly: true,
      permLevel: "Administrator"
    });
  }

  async run(message, [action, key, ...value]) { 
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);

    const settings = message.settings;
    const defaults = this.client.settings.get("default");
    const overrides = this.client.settings.get(message.guild.id);
    if (!this.client.settings.has(message.guild.id)) this.client.settings.set(message.guild.id, {});
  
    if (action && action.toLowerCase() === "edit") {
      if (!key) return message.channel.send("You must specify a key to edit.");
      if (!settings[key]) return message.channel.send("This key does not exist in my settings.");

      const joinedValue = value.join(" ");
      if (joinedValue.length < 1) return message.channel.send("You must specify a new value for this setting.");
      if (joinedValue === settings[key]) return message.channel.send("This setting already has that value.");

      if (!this.client.settings.has(message.guild.id)) this.client.settings.set(message.guild.id, {});

      if (key.includes("Channel")) {
        if (joinedValue.startsWith("<" || "#")) return message.channel.send("Please specify a channel **name**, not the channel itself.\nE.g. `general`, not `#general`.");

        const channel = message.guild.channels.find(c => c.name === joinedValue);
        if (!channel) return message.channel.send(`A channel with the name "${joinedValue}" does not exist on this server.`);
      }

      if (key.includes("Role")) {
        if (joinedValue.startsWith("<" || "@")) return message.channel.send("Please specify a role **name**, not the role itself.\nE.g. `Mod`, not `@Mod`.");

        const role = message.guild.roles.find(c => c.name === joinedValue);
        if (!role) return message.channel.send(`The role "${joinedValue}" does not exist on this server.`);
      }

      if (key === "systemNotice") {
        switch (joinedValue) {
          case "true":
          break;

          case "false":
          break;

          default: return message.channel.send("This key can only be set to `true` or `false`.");
        }
      }

      settings[key] = joinedValue;

      this.client.settings.set(message.guild.id, joinedValue, key);
      message.channel.send(`☑️ | ${key} was successfully edited to **${joinedValue}**.`);
    } else

    if (action && action.toLowerCase() === "del" || action === "reset") {
      if (!key) return message.channel.send("You must specify a key to reset.");
      if (!settings[key]) return message.channel.send("This key does not exist in my settings.");
      if (!overrides[key]) return message.channel.send("This key does not have an override and is already using defaults.");
      
      const response = await this.client.awaitReply(message, `Are you sure you want to reset \`${key}\` to the default \`${defaults[key]}\`? (y/n)`);

      if (["y", "yes"].includes(response)) {

        this.client.settings.delete(message.guild.id, key);
        message.channel.send(`☑️ | \`${key}\` was successfully reset to default.`);
      } else

      if (["n", "no", "cancel"].includes(response)) {
        message.channel.send(`Your setting for \`${key}\` remains at \`${settings[key]}\`.`);
      }
    } else
  
    if (action && action.toLowerCase() === "get") {
      if (!key) return message.channel.send("You must specify a key to view.");
      if (!settings[key]) return message.channel.send("This key does not exist in my settings.");
      message.channel.send(`The value of \`${key}\` is currently \`${settings[key]}\`.`);
      
    } else {
      const array = [];
      Object.entries(settings).forEach(([key, value]) => {
        array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
      });
      await message.channel.send(`__**= Current Server Settings =**__\n${array.join("\n")}`);
    }
  }
}

module.exports = Settings;
