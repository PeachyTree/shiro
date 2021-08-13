const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const subreddits = require('../../assets/json/meme');

module.exports = class MemeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'meme',
			group: 'random-response',
			memberName: 'meme',
			description: 'Searches for a random meme from selected subreddits!',
			details: 'Warning: There is no NSFW filter on this!'
		});
	}

	async run(msg) {
		try {
      let randSubreddit = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      randomPuppy(randSubreddit)
      .then(url => {
        const embed = new MessageEmbed()
          .setFooter(`${randSubreddit}`)
          .setDescription(`[Image URL](${url})`)
          .setImage(url)
          .setColor('RANDOM');
        return msg.embed(embed);
      });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};