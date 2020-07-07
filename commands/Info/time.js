const Command = require("../../base/Command.js");
const { stripIndents } = require("common-tags");

class Time extends Command {
  constructor(client) {
    super(client, {
      name: "time",
      description: "Returns the current time in a specified timezone.",
      category: "Info",
      usage: "time <Continent / City>",
      aliases: ["timezone", "worldtime"]
    });
  }

  async run(message, args, settings) { 
    const timeZone = args.join("_").toUpperCase();
    if (!timeZone) return message.reply('Command Usage: \`time <Continent / City>\`');

    try {
      const time = new Date().toLocaleTimeString("en-GB", { timeZone, hour12: false });
      const friendly = timeZone.substring(timeZone.indexOf("/") + 1).replace(/_/g, " ");
      return message.channel.send(`🕐 | The time in **${friendly.toProperCase()}** is currently **${time}**.`);
    } catch (err) {
      message.channel.send(stripIndents`
      An error occurred:\n\```${err.message}\```

      • Please ensure you are using the correct format, e.g. \`${settings.prefix}time europe/london\`.
      • Note that the continent of North America is split into **America** and **Canada**, e.g. \`${settings.prefix}time america/new york\`.
      `);
    }
  }
}

module.exports = Time;