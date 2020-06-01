const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const moment = require("moment");

const verificationLevels = {
    0: "None",
    1: "Low",
    2: "Medium",
    3: "(╯°□°）╯︵ ┻━┻",
    4: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
};

const contentFilterLevels = {
    0: "None",
    1: "Medium",
    2: "High"
};

class Server extends Command {
    constructor(client) {
      super(client, {
        name: "server",
        description: "Displays information about the current server.",
        category: "Info",
        usage: "server",
        aliases: ["serverinfo", "guildinfo", "guild"],
        guildOnly: true
      });
    }

    async run(message, args, level, settings) { 

        const createdTimestamp = moment.utc(message.guild.createdAt).format("YYYYMMDD");

        const embed = new RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(message.guild.iconURL)
        .setTitle(`Server Information for ${message.guild.name}`)
        .setDescription(`**Server ID:** ${message.guild.id}`)

        .addField("❯ Details", stripIndents`
        • Created: **${moment.utc(message.guild.createdAt).format("dddd, Do MMMM YYYY @ HH:mm:ss")}** (${moment(createdTimestamp, "YYYYMMDD").fromNow()})
        • Owner: **${message.guild.owner.user.tag}**
        • Region: **${message.guild.region.toProperCase()}**
        • Verification: **${verificationLevels[message.guild.verificationLevel]}**
        ‍   
        `, true)

        .addField("❯ Users", stripIndents`
        • Users: **${message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size}**
        • Bots: **${message.guild.members.filter(m => m.user.bot).size}**

        `, true)

        .addField("❯ Roles", stripIndents`
        • Default: **${message.guild.defaultRole.name}**
        • Count: **${message.guild.roles.size} roles**
        `, true)

        .addField("❯ Channels", stripIndents`
        • Text: **${message.guild.channels.filter(ch => ch.type === "text").size}**
        • Voice: **${message.guild.channels.filter(ch => ch.type === "voice").size}**
        • AFK: **${message.guild.afkChannel ? message.guild.afkChannel.name : "None"}**
        `, true)

        .addField("❯ Other", stripIndents`
        • AFK: After **${message.guild.afkTimeout / 60} min**
        • Large? **${message.guild.large.toString().toProperCase()}**
        • Content filter level: **${contentFilterLevels[message.guild.explicitContentFilter]}**
                
        `, true)

        .setFooter(`Requested by ${message.author.tag} using ${settings.prefix}serverinfo`, message.author.avatarURL);
        
        message.channel.send({ embed });
    }
}

module.exports = Server;