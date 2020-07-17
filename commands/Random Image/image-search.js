const Command = require("../../base/Command.js");
const request = require("node-superfetch");
const { MessageEmbed } = require("discord.js");
const { UNSPLASH_ACCESS_KEY } = process.env;

class ImageSearch extends Command {
  constructor(client) {
    super(client, {
      name: "image-search",
      description: "Sends a random image based on your query.",
      category: "Random Image",
      usage: "image-search <Query>",
      aliases: ["isearch", "i-search", "imagesearch"]
    });
  }

  async run(message, args) { 
    try {
      let query = args.join(" ");
      if (!query) return message.channel.send("Command Usage: `image-search <Query>`");
      else query = encodeURIComponent(args.join(" "));

      const page = Math.floor(Math.random() * 5) + 1;
      const index = Math.floor(Math.random() * 10) + 1;
      const meta = { "Authorization": `Client-ID ${UNSPLASH_ACCESS_KEY}` };

      request(`https://api.unsplash.com/search/photos?page=${page}&query=${query}`, { headers: meta })
      .then(res => res.json())
      .then(json => {
        const data = json.results[parseInt(index.toFixed(0))];
        const embed = new MessageEmbed()
          .setTitle("📷 Image")
          .setURL(data.urls.raw)
          .setDescription(`Photo by [${data.user.name}](${data.user.links.html}) on [Unsplash](https://unsplash.com)`)
          .setImage(data.urls.raw)
          .setColor('RANDOM')
          .setTimestamp();
        message.channel.send({ embed });
      })
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = ImageSearch;
