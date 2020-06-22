// This event runs anytime a Discord API error occurres.

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(error) {
    this.client.logger.error(`Discord API Error: ${error.message}`);
  }
};