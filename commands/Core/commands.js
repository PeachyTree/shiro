// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');

class Commands extends Command {
  constructor(client) {
    super(client, {
      name: "commands",
      description: "Sends a list of all command categories. When a specific category is specified, it shows all commands from that category.",
      category: "Core",
      usage: "c.commands [Category]",
      aliases: ["command", "cmd", "cmds"]
    });
  }

  async run(message, args, level, settings) {

    let categories = "Anime\nCore\nEconomy\nFun\nInfo\nModeration\nNSFW\nProductivity\nSearches"
    const category = args.join(" ").toLowerCase(); 

    if (!args.length) {
      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setDescription("Use the `commands <category>` command to list all the commands in the specified category.")
        .addField("Command Categories", categories)
        .setFooter(`Did you know? There are ${this.client.commands.size} commands in this version of Celestia!`)
      return await message.channel.send({ embed });
    } 
 
    if (category === "anime") {
      let commandsCategory = "5 Anime"
      let allCommands = ("anime\nbooru\nawwnime\nmanga\nwaifu")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of Commands in `Anime` category")
        .setDescription(`Use the \`commands\` command to get a list of all the 9 command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are ${this.client.commands.size} commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (category === "core") {
      let commandsCategory = "9 Core"
      let allCommands = ("commands\nfeedback\nhelp\ninvite\nping\nprefix\nsettings\nstats\nterms")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of Commands in `Core` category")
        .setDescription(`Use the \`commands\` command to get a list of all the 9 command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are ${this.client.commands.size} commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (category === "Economy") {
      let commandsCategory = "10 Economy"
      let allCommands = ("buy-item\nclaim\nflip\nitem-shop\nprofile\nroll\nshop\nslots\ntransfer\nwork")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of Commands in `Economy` category")
        .setDescription(`Use the \`commands\` command to get a list of all the 9 command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are ${this.client.commands.size} commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (category === "fun") {
      let commandsCategory = "19 Fun"
      let allCommands = ("advice\nbonzi\ncatfact\nfortune\nhoroscope\njoke\nkaomoji\nmagic8ball\npasta\npickupline\nquote\nrate\nrightthere\nroll\nship\nshits\ntoday\ntrivia\ntsundere")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of Commands in `Fun` category")
        .setDescription(`Use the \`commands\` command to get a list of all the 9 command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are ${this.client.commands.size} commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (category === "info") {
      let commandsCategory = "11 Info"
      let allCommands = ("avatar\nchannel\ndiscrim\nemoji\nemojiimage\nicon\nlastmessage\nserver\ntime\ntimezones\nuser")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of Commands in `Info` category")
        .setDescription(`Use the \`commands\` command to get a list of all the 9 command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are ${this.client.commands.size} commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (category === "moderation") {
      let commandsCategory = "12 Moderation"
      let allCommands = ("ban\nclear\nclear-nickname\nfetchbans\nforceban\nkick\nlistbans\nlockdown\nmute\nreport\nunmute\nwarn")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of Commands in `Moderation` category")
        .setDescription(`Use the \`commands\` command to get a list of all the 9 command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are ${this.client.commands.size} commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (category === "nsfw") {

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("To see a list of NSFW Commands, use the `c.nsfwcommands` Command!")
        .setDescription(`Use the \`commands\` command to get a list of all the 9 command categories.`)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are ${this.client.commands.size} commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (category === "productivity") {
      let commandsCategory = "10 Productivity"
      let allCommands = ("calculate\nchoose\ncolor\ncreate-emoji\ngenerate-invite\npoll\nreminder\nsay\nshorten\ntranslate")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of Commands in `Productivity` category")
        .setDescription(`Use the \`commands\` command to get a list of all the 9 command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are ${this.client.commands.size} commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (category === "searches") {
      let commandsCategory = "10 Searches"
      let allCommands = ("forecast\ngiphy\ngithub\njisho\nmeme\nsteam\nurban\nweather\nwikipedia\nyoutube")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of Commands in `Searches` category")
        .setDescription(`Use the \`commands\` command to get a list of all the 9 command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are ${this.client.commands.size} commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (!category === "anime" || "core" || "economy" || "fun" || "info" || "moderation" || "nsfw" || "productivity" || "searches") {
      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("🚫 | Command Category Not Found")
        .setDescription("Use the `commands` command without any arguments to get a list of all the available command categories.")
      return await message.channel.send({ embed });
    }
  }
}

module.exports = Commands;
