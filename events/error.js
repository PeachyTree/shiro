// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(error) {
    this.client.logger.error(`Discord API Error: ${error.message}`);
  }
};