const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class LastMessageCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'last-message',
			aliases: ['lm'],
			group: 'info',
			memberName: 'last-message',
			description: 'Returns the mentioned user\'s last message.',
			args: [
				{
					key: 'member',
					prompt: 'Which member do you want to see the last message from?',
					type: 'user'
				}
			]
		});
	}

	async run(msg, { member }) {
		try {
      const lastMsg = msg.guild.member(member).lastMessage;
      if (!lastMsg) return msg.say('This user\'s last message could not be found, or they simply may not have sent any messages here.');
      const embed = new MessageEmbed()
        .setColor(msg.guild.member(member).displayColor)
        .setAuthor(member.user.tag, member.user.displayAvatarURL)
        .setDescription(`*${lastMsg}*`)
        .setFooter(`#${msg.channel.name}`)
        .setTimestamp();
      return msg.embed(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};