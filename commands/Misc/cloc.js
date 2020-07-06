const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const { formatNumber } = require('../../util/Utils');
const { promisify } = require('util');
const exec = promisify(require('child_process').execFile);
const path = require('path');

class Cloc extends Command {
    constructor(client) {
        super(client, {
            name: "cloc",
            description: "Responds with the bot's code line count.",
            category: "Misc",
            usage: "cloc",
        });
    }

    async run(message) {
		const embed = new RichEmbed()
			.setColor(0x00AE86)
			.setFooter(`${cloc.header.cloc_url} ${cloc.header.cloc_version}`)
			.addField(`__JS (${formatNumber(cloc.JavaScript.nFiles)} Files)__`, formatNumber(cloc.JavaScript.code), true)
			.addField(`__JSON (${formatNumber(cloc.JSON.nFiles)} Files)__`, formatNumber(cloc.JSON.code), true)
			.addField(`__MD (${formatNumber(cloc.Markdown.nFiles)} Files)__`, formatNumber(cloc.Markdown.code), true)
			.addField('\u200B', '\u200B', true)
			.addField(`__Total (${formatNumber(cloc.SUM.nFiles)} Files)__`, formatNumber(cloc.SUM.code), true)
			.addField('\u200B', '\u200B', true);
		return message.channel.send({ embed });
	}
}

module.exports = Cloc;

function cloc() {
    if (this.cache) return this.cache;
    const { stdout, stderr } = await exec(
        path.join(__dirname, '..', '..', 'node_modules', '.bin', 'cloc'),
        ['--json', '--exclude-dir=node_modules', path.join(__dirname, '..', '..')]
    );
    if (stderr) throw new Error(stderr.trim());
    this.cache = JSON.parse(stdout.trim());
    return this.cache;
}