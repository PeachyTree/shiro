const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { version } = require("../../package.json");
const { FEEDBACK_CHANNEL_ID, FEEDBACK_EMOJI_ID } = process.env;

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

    async run(message, args) {
        try {
            let channel = this.client.channels.cache.get(FEEDBACK_CHANNEL_ID);

            if (!args.length) {
                return message.reply("Command Usage: `feedback <Suggestion / Issue>`")
            } else {
                const embed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`${FEEDBACK_EMOJI_ID} | Feedback command used by ${message.author.tag}`)
                    .addField("In:", `${message.guild.name}, ${message.channel.name} (${message.channel.id})`)
                    .addField("Issue:", args.join(" "))
                    .setFooter(`Celestia v${version}`)
                    .setTimestamp()
                channel.send({ embed });

                await message.react("🇸").catch(console.error);
                await message.react("🇪").catch(console.error);
                await message.react("🇳").catch(console.error);
                await message.react("🇹").catch(console.error);

                return null; 
            }
        } catch (err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
        }
    }
}

module.exports = Feedback;
