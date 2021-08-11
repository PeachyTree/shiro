module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {
    this.client.logger.log(`Left guild: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`);
    if (this.client.settings.has(guild.id)) {
      this.client.settings.delete(guild.id);
    }
  }
};