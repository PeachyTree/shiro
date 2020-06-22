const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const celestia = require("../../package.json");
const { FEEDBACK_CHANNEL } = process.env;

class Feedback extends Command {
    constructor(client) {
      super(client, {
        name: "feedback",
        description: "Want to give feedback? Encountered any bugs?",
        category: "Core",
        usage: "feedback <Suggestion / Issue>",
        aliases: ["suggestion", "suggest", "bug"]
      }); 
    }

    async run(message, args, level, settings) {
        let channel = this.client.channels.get(FEEDBACK_CHANNEL);

        if (!args.length) {
            return message.reply("Command Usage: `feedback <Suggestion / Issue>`")
        } else {

            try {
                const embed = new RichEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Feedback command used by ${message.author.tag}`)
                    .addField("In:", `${message.guild.name}, ${message.channel.name} (${message.channel.id})`)
                    .addField("Issue:", args.join(" "))
                    .setFooter(`Celestia v${celestia}`)
                    .setTimestamp()
                channel.send({ embed });

                await message.react("🇸").catch(console.error);
                await message.react("🇪").catch(console.error);
                await message.react("🇳").catch(console.error);
                await message.react("🇹").catch(console.error);

                return null;

            } catch (err) {
                return message.channel.send(`An error occurred:\n\```${err.message}\````);
            }   
       }
    }
}

module.exports = Feedback;
