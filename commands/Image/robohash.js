const Command = require("../../base/Command.js");
const request = require("node-superfetch");

class Robohash extends Command {
  constructor(client) {
    super(client, {
      name: "robohash",
      description: "Generates a picture of a robot from some given text.",
      category: "Image",
      usage: "robohash <Text>",
      aliases: ["robot"]
    });
  }

  async run(message, args) { 
    const query = args.join(" ");
    if (!query) return message.channel.send("Command Usage: `robohash <Text>`");
    if (query.match(/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/g)) return message.channel.send("Your query cannot include symbols.");

    request(`https://robohash.org/${encodeURIComponent(query)}.png`)
    .then(res => message.channel.send({ files: [{ attachment: res.body, name: `${query}.png` }] })
    .catch(error => {
      this.client.logger.error(error);
      return message.channel.send(`An error occurred: ${error.message}`);
    }));
  }
}

module.exports = Robohash;
