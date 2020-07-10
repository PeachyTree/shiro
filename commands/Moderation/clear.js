const Command = require('../../base/Command.js');

class Clear extends Command {
  constructor(client) {
    super(client, {
      name: "clear",
      description: "Clears (bulk-deletes) between 2 and 99 messages.",
      category: "Moderation",
      usage: "clear [@USER_MENTION] <Number>",
      aliases: ["prune"],
      permLevel: "Moderator",
      guildOnly: true
    });
  }

  async run(message) { 
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`I cannot run this command as I have insufficient permissions to do so. Please ensure I have the \"Manage Messages\" permission.`);

    const user = message.mentions.users.first();
    const amount = parseInt(message.content.split(" ")[1]) ? parseInt(message.content.split(" ")[1]) : parseInt(message.content.split(" ")[2]);

    if (!amount && !user) return message.reply('Command Usage: `clear [@USER_MENTION] <Number>`');
    if (amount < 2 || amount > 99) return message.channel.send("You've provided an invalid number of messages to delete. Please ensure it's between 2 and 99 (inclusive).");

    let messages = await message.channel.fetchMessages({ limit: amount });

    if (user) {
      const filterBy = user ? user.id : this.client.user.id;
      messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);

      this.client.emit("messageDeleteBulk", messages);
      for (const msg of messages) msg.channel.messages.delete(msg.id);
      
      message.channel.bulkDelete(messages)
      .then(() => {
        message.channel.send(`☑️ | **${amount}** messages were cleared.`);
      })
      .catch(error => {
        this.client.logger.error(error);
        message.channel.send(`An error occurred:\n\```${error.message}\````);
      });
    } else {
      this.client.emit("messageDeleteBulk", messages);
      for (const msg of messages.values()) msg.channel.messages.delete(msg.id);
      
      message.channel.bulkDelete(messages)
      .then(() => {
        message.channel.send(`☑️ | **${amount}** messages were cleared.`);
      })
      .catch(error => {
        if (error.message === "You can only bulk delete messages that are under 14 days old.") return message.channel.send(error.message);
        this.client.logger.error(error);
        return message.channel.send(`An error occurred:\n\```${error.message}\````);
      });
    }
  }
}

module.exports = Clear;