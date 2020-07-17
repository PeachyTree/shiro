const Command = require('../../base/Command.js');

class Clap extends Command {
    constructor(client) {
        super(client, {
            name: "clap",
            description: "Sends the same message that you had sent, but replaced with clap emojis.",
            category: "Text",
            usage: "clap <Text>",
        });
    }
  
    async run(message, args) {
        try {
            if (!args.length) {
                return message.reply("Command Usage: `clap <Text>`")
            }
            return message.channel.send(args.join(' ').replace(/ /g, ' 👏 '))
        } catch (err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
        }
    }
}

module.exports = Clap;