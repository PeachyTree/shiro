const Command = require("../../base/Command.js");
const request = require('node-superfetch');
const cheerio = require('cheerio');

class Food extends Command {
  	constructor(client) {
    	super(client, {
			name: "food",
			description: "Responds with a randomly generated food.",
			category: "Random Image",
			usage: "food"
    	});
  	}

	async run(message) {
		try {
            const { text } = await request.get('https://thissnackdoesnotexist.com/');
            const $ = cheerio.load(text);
            const img = $('div[class="Absolute-Center"]').first().attr('style').match(/background-image:url\((.+)\);/i);
            const name = $('h1[class="snack-description"]').first().text();
            return message.channel.send(name, img ? { files: [{ attachment: img[1], name: 'ai-food.jpg' }] } : {});
        } catch (err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
	}
};

module.exports = Food;
