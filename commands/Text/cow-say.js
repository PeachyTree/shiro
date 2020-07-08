const Command = require('../../base/Command.js');
const request = require('node-superfetch');

class CowSay extends Command {
    constructor(client) {
        super(client, {
            name: "cow-say",
            description: "Sends the same message that you had sent, but with the cow say style.",
            category: "Text",
            usage: "cow-say <Text>",
        });
    }
  
    async run(message, args) {
        try {
            if (!args.length) {
                return message.reply("Command Usage: `cow-say <Text>`")
            }
            const { body } = await request
                .get('http://cowsay.morecode.org/say')
                .query({
                    message: args.join(' '),
                    format: 'json'
                });
            return message.code(null, body.cow);
        } catch (err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
}

module.exports = CowSay;