const Command = require('../../base/Command.js');
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/emojify');

class Emojify extends Command {
    constructor(client) {
        super(client, {
            name: "emojify",
            description: "Sends the same message that you had sent, but converts it into emoji form.",
            category: "Text",
            usage: "emojify <Text>",
        });
    }
  
    async run(message, args) {
        try {
            if (!args.length) {
                return message.reply("Command Usage: `emojify <Text>`")
            }

            return message.channel.send(letterTrans(args.join(' '), dictionary, ' '));
        } catch (err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
        }
    }
}

module.exports = Emojify;