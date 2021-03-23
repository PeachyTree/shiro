const Command = require('../Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { CLEARBIT_KEY } = process.env;

class Company extends Command {
    constructor(client) {
        super(client, {
            name: "company",
            description: "Shows the image and website of the company you provided.",
            category: "Searches",
            usage: "company <Company Name>"
        });
    }

    async run(message, args) { 
        try {
            const query = args.join(' ');
            if (!query.length) {
                return message.reply("Command Usage: `clap <Text>`")
            }
            const data = await fetchCompany(query);
            if (!data) return message.channel.send('Could not find any results.');
            const embed = new MessageEmbed()
                .setTitle(data.name)
                .setImage(data.logo)
                .setFooter('Logos provided by Clearbit')
                .setURL('https://clearbit.com/')
                .setColor(0x00AE86);
            return message.channel.send({ embed });
        } catch (err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
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
}

module.exports = Company;