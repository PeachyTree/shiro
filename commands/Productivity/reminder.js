const Command = require('../../base/Command.js');
const ms = require('ms');

class Reminder extends Command {
  constructor(client) {
    super(client, {
      name: "reminder",
      description: "Sets a reminder for you with the given time.",
      category: "Productivity",
      usage: "reminder <Time (h | min | sec)> <Text>",
    });
  }
  
  async run(message, args) { 
    try {
      let reminderTime = args[0];

      if (!reminderTime.length) {
        return message.reply("Command Usage: `reminder <Time (h | min | sec)> <Text>`")
      }

      let reminder = args.slice(1).join(" "); 

      message.channel.send(`☑️ | Got it, ${message.author.username}! I will remind you about **${reminder}** in **${reminderTime}**! *wink*`); 

      setTimeout(function() {
        message.reply(`you wanted me to remind you about: ${reminder}`);
      }, ms(reminderTime));
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
} 

module.exports = Reminder;