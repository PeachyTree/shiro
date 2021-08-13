// The translate command uses the "@k3rn31p4nic/google-translate-api" module, 
// which is sourced from https://github.com/TheBastionBot/Bastion
// Credit to module owner: https://github.com/k3rn31p4nic

const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const translate = require('@k3rn31p4nic/google-translate-api');

module.exports = class TranslateCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'translate',
			group: 'productivity',
			memberName: 'translate',
			description: 'Translates a specific text. A language (e.g. English, German, French, etc.) must be added to specify a language to translate to.',
			args: [
				{
					key: 'language',
					prompt: 'Into what language do you want to translate?',
					type: 'string'
				},
        {
					key: 'text',
					prompt: 'What should the text be you want to translate?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { language, text }) {
		try {
      const result = await translate(text, { to: language });
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(result.text)
        .setFooter(`Translation from ${result.from.language.iso.toUpperCase()} to ${language.toUpperCase()}`);
      return msg.embed(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};