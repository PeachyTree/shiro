const { CommandoClient } = require('discord.js-commando');
const { WebhookClient } = require('discord.js');
const winston = require('winston');
const activities = require('../assets/json/activity');
const { SHIRO_WEBHOOK_ID, SHIRO_WEBHOOK_TOKEN, REPORT_CHANNEL_ID } = process.env;

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
		this.webhook = new WebhookClient(SHIRO_WEBHOOK_ID, SHIRO_WEBHOOK_TOKEN, { disableMentions: 'everyone' });
		this.activities = activities;
	}

	fetchReportChannel() {
		if (!REPORT_CHANNEL_ID) return null;
		return this.channels.fetch(REPORT_CHANNEL_ID);
	}
};
