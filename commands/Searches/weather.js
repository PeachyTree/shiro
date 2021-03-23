const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const weather = require("weather-js");

class Weather extends Command {
  constructor(client) {
    super(client, {
      name: "weather",
      description: "Displays weather information for the specified location.",
      category: "Searches",
      usage: "weather <Location>"
    });
  }

  async run(message, args) { 
    try {
      weather.find({ search: args.join(" "), degreeType: "C" }, function(err, result) {
        if (!args.length) {
          return message.reply("Command Usage: `weather <location>`")
        }

        if (err) return message.channel.send(`An error occurred:\n\```${err.message}\````);

        const ct = current.temperature;
        let col;
          
        if (ct <= 0) col = 13431807;
        else if (ct < 0 && ct >= 5) col = 12579071;
        else if (ct >= 6 && ct <= 10) col = 11861906;
        else if (ct >= 11 && ct <= 15) col = 9238900;
        else if (ct >= 16 && ct <= 20) col = 15531898;
        else if (ct >= 21 && ct <= 25) col = 16763258;
        else if (ct >= 26 && ct <= 30) col = 16739910;
        else if (ct >= 31 && ct <= 35) col = 16730914;
        else if (ct >= 36 && ct <= 40) col = 16727074;
        else if (ct >= 40) col = 12386304;
        else col = 7654911; // fallback

        const embed = new MessageEmbed()
          .setColor(col)
          .setTitle(`☀️ | __**Weather information for ${current.observationpoint}**__`)
          .setDescription(`The weather is **${current.skytext.toLowerCase()}** at the moment.`)
          .addField('• Temperature:', `**${ct}°C** / ${((1.8 * ct) + 32).toFixed(0)}°F`)
          .addField('• Feels like:', `**${current.feelslike}°C** / ${((1.8 * current.feelslike) + 32).toFixed(0)}°F`)
          .addField('• Humidity:', `**${current.humidity}%**`)
          .addField('• Wind:', `**${current.winddisplay.toLowerCase()}** / ~${(current.winddisplay.toLowerCase().replace(/[^0-9]/g,"") * 0.621).toFixed(1)} mph`)
          .setThumbnail(current.imageUrl)
          .setFooter(`Correct as of ${current.observationtime.slice(0, -3)} local time`)
          .setTimestamp();
        message.channel.send({ embed });
      });
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Weather;
