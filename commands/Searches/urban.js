const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-superfetch');

module.exports = class UrbanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'urban',
			aliases: ['urban-dictionary'],
			group: 'searches',
			memberName: 'urban',
			description: 'Searches the Urban Dictionary for the specified query.',
			args: [
				{
					key: 'query',
					prompt: 'What do you want to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { query }) {
		try {
      fetch(`http://api.urbandictionary.com/v0/define?term=${query}`)
      .then(res => res.json())
      .then(json => {
        const data = json.list[0];
        const definition = data.definition.replace(/[[\]]+/g, "");
        const example = data.example.replace(/[[\]]+/g, "");
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setAuthor('Urban Dictionary', 'https://vgy.me/ScvJzi.jpg')
          .setDescription(`Displaying Urban Dictionary definition for "**${data.word}**"\n<${data.permalink}>`)
          .addField('» Definition', `**${definition.substring(0, 1000)}...**`)
          .addField('» Example', `${example.substring(0, 1000)}...`)
          .setFooter(`Definition 1 of ${json.list.length}`)
          .setTimestamp();
        return msg.embed(embed);
      });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};