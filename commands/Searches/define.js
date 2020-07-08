const Command = require('../../base/Command.js');
const request = require('node-superfetch');
const { stripIndents } = require('common-tags');
const { WEBSTER_KEY } = process.env;

class Define extends Command {
    constructor(client) {
        super(client, {
            name: "define",
            description: "Defines the word you provided.",
            category: "Searches",
            usage: "define <Word>"
        });
    }

    async run(message, args) { 
        try {
            const word = args[0];
            if (!word.length) {
                return message.reply("Command Usage: `define <Word>`")
            }
			const { body } = await request
				.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}`)
				.query({ key: WEBSTER_KEY });
			if (!body.length) return message.channel.send('Could not find any results.');
			const data = body[0];
			if (typeof data === 'string') return message.channel.send(`Could not find any results. Did you mean **${data}**?`);
			return message.channel.send(stripIndents`
				**${data.meta.stems[0]}** (${data.fl})
				${data.shortdef.map((definition, i) => `(${i + 1}) ${definition}`).join('\n')}
			`);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
    }
}

module.exports = Define;