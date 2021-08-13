const { Command } = require('discord.js-commando');

module.exports = class ShiroCommand extends Command {
	constructor(client, info) {
		if (!info.argsPromptLimit) info.argsPromptLimit = 1;
		super(client, info);

		this.argsSingleQuotes = info.argsSingleQuotes || false;
		this.throttling = info.unknown ? null : info.throttling || { usages: 1, duration: 2 };
	}
};
