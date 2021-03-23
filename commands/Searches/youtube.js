const Command = require('../Command');
let youtube_node = require('youtube-node');
youtube = new youtube_node();
youtube.setKey(process.env.GOOGLE_API);
youtube.addParam('type', 'video');

class YouTube extends Command {
  constructor(client) {
    super(client, {
      name: "youtube",
      description: 'Searches for your query on YouTube!',
      category: "Searches",
      usage: "youtube <Video Name>",
      aliases: ['yt', 'video']
    });
  }

  async run(message, args) { 
    try {
      let query = args.join(" ");
      youtube.search(query, 1, function(error, result) {
        if (!query) {
          return message.reply('Command Usage: `youtube <Video Name>`');
        }

        if (error) {
          return message.channel.send(`An error occurred:\n\```${err.message}\````);
        } else {
          if (!result || !result.items || result.items.length < 1) {
            return message.channel.send(`No search results found for **${query}**`);
          } else if (!result.items[0].id.videoId) {
            return message.channel.send(`No search results found for **${query}**`);
          } else {
            return message.channel.send(`☑️ | **${query}** (http://www.youtube.com/watch?v=${result.items[0].id.videoId})`);
          }
        }
      });
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = YouTube;
