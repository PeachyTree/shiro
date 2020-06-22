const Command = require('../../base/Command.js');
const celestia = require("../../package.json");
const { RichEmbed, version } = require("discord.js");

class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Displays basic information or help for a command!",
      category: "Core",
      usage: "help [Command]",
      aliases: ["info"]
    });
  }

  async run(message, args, level, settings) {
    if (!args[0]) {
      try {
        const embed = new RichEmbed()
          .setColor("RANDOM")
          .setThumbnail(this.client.user.displayAvatarURL)
          .setTitle(`:wave: Hey ${message.author.username}, I'm Celestia!`)
          .setDescription("I'm a bot developed and maintained by Azura Apple#0955\n\All my commands start with the prefix `c.`. To see all my commands use `c.commands`!")
          .addField("Version", celestia.version)
          .addField("Invite link", "[Click here](https://discordapp.com/oauth2/authorize?client_id=671855064103714826&scope=bot&permissions=1476717695)")
          .setFooter(`Made with Discord.js v${version}`)
          .setTimestamp();
        message.channel.send({ embed });
      } catch (error) {
        this.client.logger.error(error);
        return message.channel.send(`🚫 | An error occurred:\n\```${error.message}\````);
      } 
    } else {
      let command = args[0];

      if (this.client.commands.has(command)) {
        command = this.client.commands.get(command);
        if (level < this.client.levelCache[command.conf.permLevel]) return; 
        
        const helpembed = new RichEmbed()
          .setColor('RANDOM')
          .setTitle('__**Command Help:**__')
          .setThumbnail('https://cdn.discordapp.com/attachments/578170428216967179/585889209165021189/cmd.png')
          .addField(`${settings.prefix}${command.help.name}:`, `${command.help.description}`)
          .addField(`Aliases`, `${command.conf.aliases.map(a => settings.prefix + a).join(", ") || "None"}`)
          .addField('__Usage:__', `${command.help.usage.includes("<") ? "<> - Required parameter" : "\u200b"} ${command.help.usage.includes("[") ? "[] - Optional parameter" : "\u200b"}\n\n${settings.prefix}${command.help.usage}`)
        message.channel.send(helpembed);
      }
    }
  }
}

module.exports = Help;