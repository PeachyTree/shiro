const Command = require('../../base/Command.js');

class Config extends Command {
  constructor(client) {
    super(client, {
      name: "config",
      description: "Modifies the default configuration for all guilds.",
      category: "Bot Owner",
      usage: "config <view | get | edit> <KEY> <VALUE>",
      guildOnly: true,
      permLevel: "Bot Owner"
    });
  }

  async run(message, [action, key, ...value]) {

    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);
    
    const defaults = this.client.settings.get("default");
  
    if (action === "add") {
      if (!key) return message.channel.send("Please specify a key to add");
      if (defaults[key]) return message.channel.send("This key already exists in the default settings");
      if (value.length < 1) return message.channel.send("Please specify a value");

      defaults[key] = value.join(" ");
  
      this.client.settings.set("default", defaults);
      message.channel.send(`☑️ | ${key} successfully added with the value of ${value.join(" ")}`);
    } else
  
    if (action === "edit") {
      if (!key) return message.channel.send("Please specify a key to edit");
      if (!defaults[key]) return message.channel.send("This key does not exist in the settings");
      if (value.length < 1) return message.channel.send("Please specify a new value");

      defaults[key] = value.join(" ");

      this.client.settings.set("default", defaults);
      message.channel.send(`☑️ | ${key} successfully edited to ${value.join(" ")}`);
    } else
  
    if (action === "del") {
      if (!key) return message.channel.send("Please specify a key to delete.");
      if (!defaults[key]) return message.channel.send("This key does not exist in the settings");
    
      const response = await this.client.awaitReply(message, `Are you sure you want to permanently delete ${key} from all guilds? This action **CANNOT** be undone.`);

      if (["y", "yes"].includes(response)) {

        delete defaults[key];
        this.client.settings.set("default", defaults);
      
        for (const [guildid, conf] of this.client.settings.filter((setting, id) => setting[key] && id !== "default")) {
          delete conf[key];
          this.client.settings.set(guildid, conf);
        }
      
        message.channel.send(`☑️ | ${key} was successfully deleted.`);
      } else

      if (["n","no","cancel"].includes(response)) {
        message.channel.send("Action cancelled.");
      }
    } else
  
    if (action === "get") {
      if (!key) return message.channel.send("Please specify a key to view");
      if (!defaults[key]) return message.channel.send("This key does not exist in the settings");
      message.channel.send(`The value of ${key} is currently ${defaults[key]}`);
      
    } else {
      const array = [];
      Object.entries(this.client.settings.get("default")).forEach(([key, value]) => {
        array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
      });
      await message.channel.send(`__**= Bot Default Settings =**__\n${array.join("\n")}`);
    }
  }
}

module.exports = Config;
