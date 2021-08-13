const Command = require('../../structures/Command');
let youtube_node = require('youtube-node');
youtube = new youtube_node();
youtube.setKey(process.env.GOOGLE_API);
youtube.addParam('type', 'video');

module.exports = class YouTubeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'youtube',
			aliases: ['yt', 'video'],
			group: 'searches',
			memberName: 'youtube',
			description: 'Searches for your query on YouTube!',
			args: [
				{
					key: 'query',
					prompt: 'What video do you want to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { query }) {
		try {
      youtube.search(query, 1, function(error, result) {
        if (error) {
          return msg.say(`An error occurred:\n\```${err.message}\````);
        } else {
          if (!result || !result.items || result.items.length < 1) {
            return msg.say(`No search results found for **${query}**`);
          } else if (!result.items[0].id.videoId) {
            return msg.say(`No search results found for **${query}**`);
          } else {
            return msg.say(`☑️ | **${query}** (http://www.youtube.com/watch?v=${result.items[0].id.videoId})`);
          }
        }
      });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};