const Command = require('../Command');
const request = require('node-superfetch');
const { IMGUR_KEY, HUG_ALBUM_ID } = process.env; 

class Hug extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            description: 'Hugs the user you mentioned!',
            category: 'Action',
            usage: 'hug <@USER_MENTION>',
            guildOnly: true,
            aliases: ['cuddle']
        });
    }

    async run(message) {
       
        let user = message.mentions.members.first() 

        if (!user) {
            return message.reply('Command Usage: `hug <@USER_MENTION>`')
        }

        const image = await this.random();
        if (!image) return message.reply('This album has no images...');
        return message.channel.send(`_**${message.author.username}** blushes at **${user.username}**._`, { files: [image] });

    }

    async random() {
        if (this.client.cache) return this.client.cache[Math.floor(Math.random() * this.client.cache.length)];
        const { body } = await request
            .get(`https://api.imgur.com/3/album/${HUG_ALBUM_ID}`)
            .set({ Authorization: `Client-ID ${IMGUR_KEY}` });
        if (!body.data.images.length) return null;
        this.client.cache = body.data.images.map(image => image.link);
        setTimeout(() => { this.client.cache = null; }, 3.6e+6);
        return body.data.images[Math.floor(Math.random() * body.data.images.length)].link;
    }
}

module.exports = Hug;