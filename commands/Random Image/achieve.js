const Command = require("../../base/Command.js");
const Discord = require('discord.js');

class Achieve extends Command {
  	constructor(client) {
    		super(client, {
			name: "achieve",
			description: "Sends an achievement.",
			category: "Random Image",
			usage: "achieve"
    	});
  }

	async run (message, args) {
      try {
        if (!args[0]) return message.reply('You need to input somthing to make an achievement!');

        message.channel.send(new Discord.MessageAttachment('https://www.minecraftskinstealer.com/achievement/a.php?i=20&h=Achievment+Get!&t=' + encodeURIComponent(args.join(' ')), 'mc.png'))  
      } catch (err) {
        message.channel.send('There was an error!\n' + err).catch();
      }
    }
}

module.exports = Achieve;
