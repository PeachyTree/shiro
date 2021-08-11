const { MessageEmbed, version } = require('discord.js');
const { version } = require('../package.json');

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {
    let defaultChannel = '';
    guild.channels.forEach((channel) => {
      if(channel.type == 'text' && defaultChannel == '') {
        if(channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
          defaultChannel = channel;
        }
      }
    });
    this.client.logger.log(`New guild has been joined: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`);
    let guildOwner = guild.owner;
    const embed = new MessageEmbed()
      .setTitle('Hiya! I\'m Shiro. I\'m a bot developed and maintained by Shinwulf.')
      .setColor('RANDOM')
      .setDescription(`You must be the server owner, ${guildOwner}! Somebody invited me to your server **${guild.name}**. My prefix is \`s.\` (but can be changed).\nTo view all commands and information, use the \`s.help\` and \`s.commands\` commands!`)
      .addField('Version:', `v${version}`)
      .setFooter(`Made with Discord.js (v${version}) and Node.js (${process.version})`)
    return defaultChannel.send({ embed }); 
  } 
}; 