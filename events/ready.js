const activities = require("../assets/json/bot/activities");

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

    // Activity List
    setInterval(() => { 
      let index = activities[Math.round(Math.random() * (activities.length - 1))];
      this.client.user.setPresence({ game: { name: index, type: "PLAYING"}});
  }, 300000); // = 5 minutes
    this.client.logger.log(`Ready and logged in as ${this.client.user.tag}`, "ready");
  }
};
