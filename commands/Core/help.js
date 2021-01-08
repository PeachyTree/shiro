const Command = require('../../base/Command.js');
const shiro = require("../../package.json");
const { MessageEmbed, version } = require("discord.js");
const { SHIRO_INVITE_LINK } = process.env;

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
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setThumbnail(this.client.user.displayAvatarURL())
          .setTitle(`:wave: Hey ${message.author.username}, I'm Shiro!`)
          .setDescription("I'm a bot developed and maintained by Shin#0484\n\All my commands start with the prefix `s.`. To see all my commands use `s.commands`!")
          .addField("Version", shiro.version)
          .addField("Invite link", `[Click here](${SHIRO_INVITE_LINK})`)
          .setFooter(`Made with Discord.js v${version}`)
          .setTimestamp();
        message.channel.send({ embed });
      } catch (err) {
        return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
      }
    } else {
      let command = args[0];

      if (this.client.commands.has(command)) {
        command = this.client.commands.get(command);
        if (level < this.client.levelCache[command.conf.permLevel]) return; 
        
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setTitle('__**Command Help:**__')
          .setThumbnail('https://cdn.discordapp.com/attachments/578170428216967179/585889209165021189/cmd.png')
          .addField(`${settings.prefix}${command.help.name}:`, `${command.help.description}`)
          .addField(`Aliases`, `${command.conf.aliases.map(a => settings.prefix + a).join(", ") || "None"}`)
          .addField('__Usage:__', `${command.help.usage.includes("<") ? "<> - Required parameter" : "\u200b"} ${command.help.usage.includes("[") ? "[] - Optional parameter" : "\u200b"}\n\n${settings.prefix}${command.help.usage}`)
        message.channel.send({ embed });
      }
    }
  }
}

module.exports = Help;
