// If there may be any commands that are still in development, or may not work fully yet, that's what this base is for!

class Indev {
  constructor(client, {
    name = null,
    description = "No description provided.",
    category = "Miscellaneous",
    usage = "No usage provided.",
    enabled = false,
    guildOnly = false,
    aliases = new Array(),
    permLevel = "Bot Owner"
  }) {
    this.client = client;
    this.conf = { enabled, guildOnly, aliases, permLevel };
    this.help = { name, description, category, usage };
  }
}
module.exports = Indev;
