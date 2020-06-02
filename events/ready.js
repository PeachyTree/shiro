// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const { version } = require("../package.json");

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run() {

    await this.client.wait(1000);

    this.client.appInfo = await this.client.fetchApplication();
    setInterval( async () => {
      this.client.appInfo = await this.client.fetchApplication();
    }, 60000);

    if (!this.client.settings.has("default")) {
      if (!this.client.config.defaultSettings) throw new Error("defaultSettings not preset in config.js or settings database. Bot cannot load.");
      this.client.settings.set("default", this.client.config.defaultSettings);
    }

    this.client.user.setStatus("dnd");
    await this.client.wait(5000);

    this.client.user.setStatus("online");

    const activities_list = [
      "c.help | Use c.invite to invite me!", 
      "c.help | View all Command categories: c.commands",
      "c.help | Follow my creator on Twitter: @azura_apple",
      "c.help | Need help for any command? Use c.help <command>!",
      "c.help | Found bugs? c.feedback",
      "c.help | Suggestions? c.feedback",
      `c.help | v${version}`
      ]; 

    this.client.user.setStatus("online");
    setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
      this.client.user.setPresence({ game: { name: activities_list[index], type: "PLAYING"}});
  }, 300000); 
    this.client.logger.log(`Ready and logged in as ${this.client.user.tag}`, "ready");
  }
};
