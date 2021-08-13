/*
  OUTCOME TYPES:
  ==============
  Positive: 14
  Neutral: 7
  Negative: 14
*/

const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const outcomes = require('../../assets/json/magic8ball');

module.exports = class EightBallCommand extends Command {
	constructor(client) {
		super(client, {
			name: '8-ball',
			aliases: ['magic-8-ball'],
			group: 'random-response',
			memberName: '8-ball',
			description: 'Consults my magic 8-ball!',
			args: [
				{
					key: 'question',
					prompt: 'What do you want to ask to the magic 8-ball?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { question }) {
		try {
      const randomOutcome = outcomes.random();
      if (randomOutcome.startsWith('http://i.imgur.com/')) {
        const embed = new MessageEmbed()
          .setTitle('🎱 | __**Magic 8 Ball says...**__')
          .setDescription(`${question}`)
          .setImage(randomOutcome)
          .setColor('RANDOM')
          .setFooter(`Question asked by ${msg.author.tag}`, msg.author.displayAvatarURL);
        return msg.embed(embed);
      } else {
        const embed = new MessageEmbed()
          .setTitle(`🎱 | __**Magic 8 Ball says...**__`)
          .setColor('RANDOM')
          .setDescription(stripIndents`
            ${question}
            **${randomOutcome}**
          `)
          .setFooter(`Question asked by ${msg.author.tag}`, msg.author.displayAvatarURL);
        return msg.embed(embed);
      }
		} catch (err) {
			return msg.reply(`Oh no, my magic 8 Ball says: \`${err.message}\`.`);
		}
	}
};