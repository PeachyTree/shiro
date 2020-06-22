const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');

class NSFWCommands extends Command {
  constructor(client) {
    super(client, {
      name: "nsfwcommands",
      description: "Lists all the NSFW command categories! When a specific category is specified, it shows all commands from that category.",
      category: "NSFW",
      usage: "nsfwcommands [Category]",
      aliases: ['commandsnsfw', 'cnsfw', 'pervert']
    });
  }

  async run(message, args, level, settings) {

    let categories = "2D NSFW\n2D Fetish\n3D NSFW\n3D Fetish\nNSFW Image Boards\nOther"
    const category = args.join(" ").toLowerCase(); 

    if (!args.length) {
      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setDescription("Use the `nsfwcommands <category>` command to list all the NSFW commands in the specified category.")
        .addField("NSFW Command Categories", categories)
        .setFooter(`Did you know? There are 48 NSFW commands in this version of Celestia!`)
      return await message.channel.send({ embed });
    } 

    if (category === "2d nsfw") {
      let commandsCategory = "10 2D NSFW"
      let allCommands = ("ecchi\nhentai\nhentaigif\nhentaiirl\nneko\npantsu\noppai\nyaoi\nyuri\nzr")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of NSFW Commands in `2D NSFW` category")
        .setDescription(`Use the \`nsfwcommands\` command to get a list of all the NSFW command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are 48 NSFW commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else 
    if (category === "2d fetish") {
      let commandsCategory = "9 2D Fetish"
      let allCommands = ("ahegao\nbara\nbondage\nfuta\nmonstergirl\npaizuri\nsukebei\ntentacle\ntrap")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of NSFW Commands in `2D Fetish` category")
        .setDescription(`Use the \`nsfwcommands\` command to get a list of all the NSFW command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are 48 NSFW commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (category === "3d nsfw") {
      let commandsCategory = "7 3D NSFW"
      let allCommands = ("4knsfw\nartsyporn\nass\nboobs\nnsfw\nnsfwgif\npussy")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of NSFW Commands in `3D NSFW` category")
        .setDescription(`Use the \`nsfwcommands\` command to get a list of all the NSFW command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are 48 NSFW commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (category === "3D Fetish") {
      let commandsCategory = "6 3D Fetish"
      let allCommands = ("asian\namateur\nbdsm\ncosplay\ngrool\nlingerie")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of NSFW Commands in `3D Fetish` category")
        .setDescription(`Use the \`nsfwcommands\` command to get a list of all the NSFW command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are 48 NSFW commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (category === "nsfw image boards") {
      let commandsCategory = "10 NSFW Image Boards"
      let allCommands = ("danbooru\ngelbooru\nhypno\nkonachan\npaheal\nrule34\ntbib\nyandere\nxbooru\ne621")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of NSFW Commands in `NSFW Image Boards` category")
        .setDescription(`Use the \`nsfwcommands\` command to get a list of all the NSFW command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are 48 NSFW commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (category === "other") {
      let commandsCategory = "2 Other"
      let allCommands = ("nonsfw\nsetnsfw")

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("List of NSFW Commands in `Other` category")
        .setDescription(`Use the \`nsfwcommands\` command to get a list of all the NSFW command categories.`)
        .addField(`${commandsCategory} Commands`, `\`\`\`css\n${allCommands}\`\`\``)
        .addField("Need more details?", "Check out the help message of the command, using the `help <command>` command.")
        .setFooter(`Did you know? There are 48 NSFW commands in this version of Celestia!`)
      await message.channel.send({ embed });

    } else if (!category === "2d nsfw" || "2d fetish" || "3d nsfw" || "3d fetish" || "nsfw image boards" || "other") {
      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("🚫 | NSFW Command Category Not Found")
        .setDescription("Use the `nsfwcommands` command without any arguments to get a list of all the available NSFW command categories.")
      return await message.channel.send({ embed });
    }
  }
}

module.exports = NSFWCommands;
