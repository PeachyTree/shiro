const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');

class Mute extends Command {
  constructor(client) {
    super(client, {
      name: "mute",
      description: "Mutes the mentioned user.",
      category: "Moderation",
      usage: "mute <@USER_MENTION> <Reason>",
      permLevel:"Moderator",
      guildOnly: true
    });
  }

  async run(message, args) {
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`I cannot run this command as I have insufficient permissions to do so. Please ensure I have the \"Manage Roles\" permission.`);

    const muteRole = message.guild.roles.find(role => role.name === "Muted");
    const empty = await this.isEmpty(muteRole);
    if (empty) {
      const roleRequest = await this.client.awaitReply(message, "A \"**Muted**\" role does not exist on this server. Would you like me to create one? (__Y__es / __N__o)", 30000);
      if (roleRequest.toLowerCase() === "y" || roleRequest.toLowerCase() === "yes") {
        message.guild.createRole({ name: "Muted" })
        .then(role => message.channel.send(`☑️ | Created new role: **${role.name}**.`))
        .catch(error => {
          this.client.logger.error(error.stack);
          return message.channel.send(`An error occurred:\n\```${error.message}\````);
        });
      } else {
        return message.channel.send("Cancelled. I will not create a \"Muted\" role. You will not be able to mute users without having a \"Muted\" role.");
      }
    }

    const user = message.mentions.users.first();
    let reason = args.slice(1).join(" ");
    
    if (!user) return message.reply('Command Usage: `mute <@USER_MENTION> <Reason>`')
    if (user.id === message.author.id) return message.channel.send("You cannot mute yourself!");
    if (message.guild.member(message.author).highestRole.position <= message.guild.member(user).highestRole.position) return message.channel.send("🚫 | You cannot mute this user as they have a higher role than you.");

    if (!empty) {
      if (message.guild.member(user).roles.has(muteRole.id)) {
        return message.channel.send("The mentioned user is already muted.");
      }

      if (!reason) {
        message.channel.send('Please enter a reason for this action...\nThis text-entry period will time-out in 30 seconds. Reply with `cancel` to exit.');
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

      message.guild.channels.forEach(async (channel) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          SPEAK: false
        }).catch(error => {
          this.client.logger.error(error.stack);
          return message.channel.send(`An error occurred:\n\```${error.message}\````);
        });
      });
  
      message.guild.member(user).addRole(muteRole.id)
      .catch(error => {
        this.client.logger.error(error.stack);
        return message.channel.send(`An error occurred:\n\```${error.message}\````);
      });

      try {
        const embed = new MessageEmbed()
          .setTitle(`🔇 | __**Member muted in #${message.channel.name}**__`)
          .setColor('RANDOM')
          .addField('Target:', `${user.tag} (${user.id})`)
          .addField('Issued by:', `${message.author.tag} (${message.author.id})`)
          .addField('Reason:', `${reason}`)
          .setFooter('Moderation system powered by Celestia <3', this.client.user.displayAvatarURL)
          .setTimestamp();
        message.channel.send({ embed });
        user.send(`You were muted by staff in the **${message.guild.name}** server for the reason "${reason}".\nPlease ensure you follow all the rules of the server in the future to avoid this occurring again.`);
      } catch (error) {
        this.client.logger.error(error.stack);
        return message.channel.send(`An error occurred:\n\```${error.message}\````);
      }
    }
  }

  async isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
}

module.exports = Mute;