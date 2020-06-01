// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) { 
    //this.client.on("messageDelete", () => this.client.logger.debug("Message deleted."));
  }
};