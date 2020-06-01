// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {

    this.client.logger.log(`Left guild: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`);

    //this.client.user.setActivity(`over ${this.client.guilds.size} servers`, { type: "WATCHING" });
    
    if (this.client.settings.has(guild.id)) {
      this.client.settings.delete(guild.id);
    }
  }
};
