const Command = require('../../base/Command.js');
const weather = require('weather-js');

class Forecast extends Command {
  constructor(client) {
    super(client, {
      name: "forecast",
      description: "Shows the weather forecast for 5 days of the specified city.",
      category: "Searches",
      usage: "forecast < City, country_code | Zipcode >"
    });
  }

  async run(message, args) { 

    if (!args.length) {
      return message.reply("Command Usage: `forecast < city, country_code | zipcode >`")
    }

    await weather.find({ search: args.join(' '), degreeType: 'C' }, async (err, result) => {
      if (err) {
        return message.channel.send(`No search results found.`);
      }

      if (!result || !result.length) {
        return message.channel.send("Connection error.");
      }

      let fields = [];
      for (let i = 0; i < result[0].forecast.length; i++) {
        fields.push({
          name: new Date(result[0].forecast[i].date).toDateString(),
          value: `**Condition:** ${result[0].forecast[i].skytextday}\n**Low:** ${result[0].forecast[i].low} \u00B0${result[0].location.degreetype}\n**High:** ${result[0].forecast[i].high} \u00B0${result[0].location.degreetype}\n**Precipitation:** ${result[0].forecast[i].precip} cm`
        });
      }

      await message.channel.send({
        embed: {
          title: '☀️ | Weather Forecast',
          description: result[0].location.name,
          fields: fields,
          footer: {
            text: 'Powered by MSN Weather'
          }
        }
      });
    });
  };
}

module.exports = Forecast;
