const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class PollCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'poll',
			group: 'productivity',
			memberName: 'poll',
			description: 'Starts a poll in the current text channel asking users to vote with the specified time. ',
			details: 'If no time is specified, poll ends in 60 minutes.',
			args: [
				{
					key: 'question',
					prompt: 'What should the poll be about?',
					type: 'string'
				},
        {
					key: 'time',
					prompt: 'For how long should the poll last (in minutes)?',
					type: 'string',
					default: ''
				}
			]
		});
	}

	async run(msg, { question, time }) {
		try {
      if (!time) time == 3.6e+6;
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('Poll Started')
        .setDescription(question)
        .setFooter(`Poll created by ${msg.author.username}`);
      let ms = await msg.embed(embed);
      await ms.react('✅'); 
      await ms.react('❌');
      msg.fetchMessage(ms.id)
      .then(msg => {
        let upVoteCollection = ms.reactions.filter(rx => rx.emoji.name == '✅');
        let upVotes = upVoteCollection.first().count;
        let downVoteCollection = ms.reactions.filter(rx => rx.emoji.name == '❌');
        let downVotes = downVoteCollection.first().count;
        return msg.say(stripIndents`
          Poll ended by ${msg.author.username}.
          Results: ✅: ${upVotes} votes, ❌: ${downVotes} votes
        `);
      });
      return ms.delete({ timeout: time });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};