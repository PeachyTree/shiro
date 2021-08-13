const { CommandoClient } = require('discord.js-commando');
const winston = require('winston');
const activities = require('../assets/json/activity');
const { FEEDBACK_CHANNEL_ID } = process.env;

module.exports = class ShiroClient extends CommandoClient {
	constructor(options) {
		super(options);

		this.logger = winston.createLogger({
			transports: [new winston.transports.Console()],
			format: winston.format.combine(
				winston.format.timestamp({ format: 'MM/DD/YYYY HH:mm:ss' }),
				winston.format.printf(log => `[${log.timestamp}] [${log.level.toUpperCase()}]: ${log.message}`)
			)
		});
		this.activities = activities;
	}

	fetchFeedbackChannel() {
		if (!FEEDBACK_CHANNEL_ID) return null;
		return this.channels.fetch(FEEDBACK_CHANNEL_ID);
	}
};