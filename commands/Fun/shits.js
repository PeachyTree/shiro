// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const Jimp = require('jimp');

class Shits extends Command {
    constructor(client) {
        super(client, {
            name: 'shits',
            description: 'It\'s shit!!!',
            category: 'Fun',
            usage: 'shits <Text>',
            guildOnly: true
        });
    }

    async run(message, args, level, settings) {
        if (!message.channel.permissionsFor(this.client.user).has('ATTACH_FILES')) {
            return message.channel.send('🚫 | I can\'t attach messages!');
        }

        if (args.length < 1) {
            return message.react('🚫'), message.channel.send('Command Usage: `shits <Text>`');
        }

        await message.channel.startTyping()

        const text = args.join(" ");
        const shits = await Jimp.read('assets/images/SHITS.png');
        const blank = await Jimp.read('assets/images/blank.png');

        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

        blank.resize(195, 175);
        const search = blank.print(font, 0, 0, text, 175);

        shits.composite(search, 810, 31);
        shits.getBuffer(Jimp.MIME_PNG, async(err, buffer) => {
            await message.channel.send({
                files: [{
                    name: 'shits.png',
                    attachment: buffer
                }]
            })

            await message.channel.stopTyping()
        })

        return null;
    }
}

module.exports = Shits;