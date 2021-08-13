const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { CLEARBIT_KEY } = process.env;

module.exports = class CompanyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'company',
			aliases: ['clearbit'],
			group: 'searches',
			memberName: 'company',
			description: 'Shows the image and website of the company you provided.',
			args: [
				{
					key: 'query',
					prompt: 'What company do you want to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { query } ) {
		try {
            const data = await fetchCompany(query);
            if (!data) return msg.say('Could not find any results.');
            const embed = new MessageEmbed()
                .setTitle(data.name)
                .setImage(data.logo)
                .setFooter('Logos provided by Clearbit')
                .setURL('https://clearbit.com/')
                .setColor(0x00AE86);
            return msg.embed(embed);
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
        }
    }

    async fetchCompany(query) {
        const { body } = await request
            .get(`https://autocomplete.clearbit.com/v1/companies/suggest`)
            .query({ query })
            .set({ Authorization: `Bearer ${CLEARBIT_KEY}` });
        if (!body.length) return null;
        return body[0];
	}
};