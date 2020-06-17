// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

// The COMMANDS command is used to display every command's name and description
// to the user, so that they can see what commands are available. The commands
// command is also filtered by level, so if a user does not have access to
// a command, it is not shown to them. If a command name is given with the
// help command, its extended help is shown.

const Command = require('../../base/Command.js');

class Commands extends Command {
  constructor(client) {
    super(client, {
      name: "commands",
      description: "Sends a list of all commands.",
      category: "Core",
      usage: "commands",
      aliases: ["command", "cmd", "cmds"]
    });
  }

  async run(message, args, level, settings) {

    if (!args[0]) {
      // Loads guild settings (for prefixes and eventually per-guild tweaks)
      const settings = message.settings;
      
      // Filters all commands by which are available for the user's level, using the <Collection>.filter() method.
      const myCommands = message.guild ? this.client.commands.filter(cmd => this.client.levelCache[cmd.conf.permLevel] <= level) : this.client.commands.filter(cmd => this.client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
      
      // Gets command names only, and uses that array to get the longest name.
      // This allows the output to be nicely aligned.
      const commandNames = myCommands.keyArray();
      const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
      let currentCategory = "";
      let output = `= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n`;
      const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
      sorted.forEach( c => {
        const cat = c.help.category.toProperCase();
        if (currentCategory !== cat) {
          output += `\u200b\n== ${cat} ==\n`;
          currentCategory = cat;
        }
        output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
      });

      // Sends the output to the message author, and catches any errors that occur
        message.channel.send('Sending commands to your DM...');
        message.author.send(output, { code:"asciidoc", split: { char: "\u200b" } })
        .catch(e => {
          if (e.toString().startsWith("DiscordAPIError: Cannot send messages to this user")) {
            return message.channel.send(`Cannot send DMs to ${message.author}. Please enable the setting in your settings.`)
          } else {
            this.client.logger.error(e);
            return message.channel.send(`An Error occurred: ${e.message}`);
          }
        });
      
      if (message.channel.type === "dm") {
        await this.client.wait(2000);
        message.author.send("Please note that due to the `commands` command being run in DMs, only commands that work in DMs are shown in the list of commands.\nFor a list of *all* commands available for your permission level, please run the `commands` command in a server.");
      }
    }
  }
}

module.exports = Commands;
