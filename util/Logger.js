// Logger class for unique and advanced logging

const chalk = require("chalk");
const moment = require("moment");

class Logger {
  static log(content, type = "log") {
    const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
    switch (type) {
      case "log": { 
        return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
      }
      case "warn": { // Warn logger, usually runs if the eval command is used, as example
        return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
      }
      case "info": { // Info logger, usually runs when the bot starts or shuts down
        return console.log(`${timestamp} ${chalk.cyan(type.toUpperCase())} ${content} `);
      }
      case "error": { // Error logger, for logging advanced error messages
        return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
      }
      case "debug": { 
        return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
      }
      case "cmd": { // When a command is run by someone, it'll log it
        return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
      }
      case "panel": { 
        return console.log(`${timestamp} ${chalk.black.bgCyan(type.toUpperCase())} ${content}`);
      }
      case "ready": { // Runs when the bot starts up. To this counts loading events and loading commands
        return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
      } 
      default: throw new TypeError("Logger type must be one of either log, warn, info, error, debug, cmd, panel or ready.");
    }
  }
  
  static error(content) {
    return this.log(content, "error");
  }
  
  static warn(content) {
    return this.log(content, "warn");
  }

  static info(content) {
    return this.log(content, "info");
  }
  
  static debug(content) {
    return this.log(content, "debug");
  }
  
  static cmd(content) {
    return this.log(content, "cmd");
  }

  static panel(content) {
    return this.log(content, "panel");
  }
}

module.exports = Logger;
