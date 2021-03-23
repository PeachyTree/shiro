const Command = require('../Command');
const { MessageEmbed } = require('discord.js');

class Unmute extends Command {
  constructor(client) {
    super(client, {
      name: "unmute",
      description: "Undoes the mentioned user's mute.",
      category: "Moderation",
      usage: "unmute <@USER_MENTION> <Reason>",
      permLevel: "Moderator",
      guildOnly: true
    });
  }

  async run(message, args, level, settings) { 
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`I cannot run this command as I have insufficient permissions to do so. Please ensure I have the \"Manage Roles\" permission.`);

    const muteRole = message.guild.roles.find(role => role.name === "Muted");
    const empty = await this.isEmpty(muteRole);
    if (empty) return message.channel.send(`A "Muted" role does not exist on this server. To create one, please run the \`${settings.prefix}mute\` command.`);

    const user = message.mentions.users.first();
    let reason = args.slice(1).join(" ");
    
    if (!user) return message.reply("Command Usage: `unmute <@USER_MENTION> <Reason>`")
    if (user.id === message.author.id) return message.channel.send("You cannot unmute yourself!");
    if (message.guild.member(message.author).highestRole.position <= message.guild.member(user).highestRole.position) return message.channel.send("🚫 | You cannot unmute this user as they have a higher role than you.");

    if (!reason) {
      message.channel.send("Please enter a reason for unmuting this user...\nThis text-entry period will time-out in 30 seconds. Reply with `cancel` to exit.");
      await message.channel.awaitMessages(m => m.author.id === message.author.id, {
        "errors": ["time"],
        "max": 1,
        time: 30000
      }).then(resp => {
        if (!resp) return message.channel.send('Timed out.');
        resp = resp.array()[0];
        if (resp.content.toLowerCase() === "cancel") return message.channel.send('Cancelled!');
        reason = resp.content;
        if (resp) resp.react("✅");
      }).catch(() => {
        message.channel.send('Timed out.');
      });
    }

    if (message.guild.member(user).roles.has(muteRole.id)) {
      message.guild.member(user).removeRole(muteRole).then(() => {
        message.react("✅");
      });
    } else {
      return message.channel.send("The mentioned user isn't muted, so I cannot unmute them.");
    }

    try {
      const embed = new MessageEmbed()
        .setTitle("🔊 | __**Member unmuted**__")
        .setColor('RANDOM')
        .addField('User:', `${user.tag} (${user.id})`)
        .addField('Unmuted by:', `${message.author.tag} (${message.author.id})`)
        .addField('Reason:', `${reason}`)
        .setFooter('Moderation system powered by Shiro', this.client.user.displayAvatarURL)
        .setTimestamp();
      message.channel.send({ embed });
      user.send(`You have been unmuted in **${message.guild.name}**.\nPlease ensure you always follow the rules to prevent being muted again!`);
    } catch (error) {
      this.client.logger.error(error.stack);
      return message.channel.send(`An error occurred:\n\```${error.message}\````);
    }
  }

  async isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
}

module.exports = Unmute;