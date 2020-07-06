const Command = require('../../base/Command.js');

class CreateEmoji extends Command {
  constructor(client) {
    super(client, {
      name: "create-emoji",
      description: "Creates a new emoji.",
      category: "Productivity",
      usage: "create-emoji <IMAGE_URL> <Emoji Name>",
      guildOnly: true
    });
  }

  async run(message, args) { 
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);
    if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send("As you do not have the \"Manage Emojis\" permission, you cannot use this command.");
    
    const image = args[0] ? args[0].replace(/<(.+)>/g, "$1") : null;
    const name = args[1];
    let isImgLink;

    if (!image) return message.reply("Command Usage: `create-emoji <IMAGE_URL> <Emoji Name>`");

    if (image.startsWith("https://i.imgur") || image.startsWith("https://vgy.me")) {
      isImgLink = true;
    } else {
      isImgLink = false;
    }

    if (image.split(".").pop() !== "png") isImgLink = false;

    if (isImgLink === false) return message.channel.send(`Invalid URL provided!\nPlease ensure the image link you've provided is from either Imgur or vgy.me, starts with \`https://\` and ends with \`.png\.`);
    if (!name) return message.channel.send("Command Usage: `create-emoji <IMAGE_URL> <Emoji Name>`");

    message.guild.createEmoji(image, name)
    .then(emoji => message.channel.send(`☑️ | Created new emoji: <:${emoji.name}:${emoji.id}>.`))
    .catch(error => {
      if (error.message === "404 Not Found") return message.channel.send("An image could not be found at that link.");
      this.client.logger.error(error);
      message.channel.send(`An error occurred:\n\```${err.message}\````);
    });
  }
}

module.exports = CreateEmoji;