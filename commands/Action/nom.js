const Command = require('../../base/Command.js');
const request = require('node-superfetch');
const { IMGUR_KEY, NOM_ALBUM_ID } = process.env; 

class Nom extends Command {
    constructor(client) {
        super(client, {
            name: 'nom',
            description: 'Noms on the user you mentioned!',
            category: 'Action',
            usage: 'nom <@USER_MENTION>',
            guildOnly: true,
            aliases: ['eat', 'munch']
        });
    }

    async run(message, args) {
        let user = message.mentions.members.first() 

        if (!user) {
            return message.reply('Command Usage: `nom <@USER_MENTION>`')
        }

        const image = await this.random();
        if (!image) return message.reply('This album has no images...');
        return message.channel.send(`_**${message.author.username}** noms on **${user.username}**._`, { files: [image] });

    }

    async random() {
        if (this.client.cache) return this.client.cache[Math.floor(Math.random() * this.client.cache.length)];
        const { body } = await request
            .get(`https://api.imgur.com/3/album/${NOM_ALBUM_ID}`)
            .set({ Authorization: `Client-ID ${IMGUR_KEY}` });
        if (!body.data.images.length) return null;
        this.client.cache = body.data.images.map(image => image.link);
        setTimeout(() => { this.client.cache = null; }, 3.6e+6);
        return body.data.images[Math.floor(Math.random() * body.data.images.length)].link;
    }
};

module.exports = Nom;