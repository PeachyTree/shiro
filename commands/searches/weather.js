const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = class WeatherCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'weather',
			group: 'searches',
			memberName: 'weather',
			description: 'Displays weather information for the specified location.',
			args: [
				{
					key: 'location',
					prompt: 'What location are you looking for?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { location }) {
		try {
      weather.find({ search: location, degreeType: "C" }, function(err, result) {
        if (err) return msg.say(`An error occurred:\n\```${err.message}\````);
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
        return msg.embed(embed);
      });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};