// This event runs anytime the bot is being added to a server

const { MessageEmbed, version } = require('discord.js');
const pkg = require("../package.json");

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  // Sends a message to a text channel in the server, informing people that someone has added it
  async run(guild) {
    let defaultChannel = "";
    guild.channels.forEach((channel) => {
      if(channel.type == "text" && defaultChannel == "") {
        if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
          defaultChannel = channel;
        }
      }
    }) 

    // Logs that the bot has joined a server, with the server name and ID:
    this.client.logger.log(`New guild has been joined: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`);
    let guildOwner = guild.owner;

    // This is the embed that'll be sent to the channel above. Can of course be changed to anything!
    const embed = new MessageEmbed()
      .setTitle('Hiya! I\'m Shiro. I\'m a bot developed and maintained by Snowball ♪#0955.')
      .setColor('RANDOM')
      .setDescription(`You must be the server owner, ${guildOwner}! Somebody invited me to your server **${guild.name}**. My prefix is \`s.\` (but can be changed).\nTo view all commands and information, use the \`s.help\` and \`s.commands\` commands!`)
      .addField('Version:', `v${pkg.version}`)
      .setFooter(`Made with Discord.js (v${version}) and Node.js (${process.version})`)
    defaultChannel.send({ embed }); 
  } 
}; 
