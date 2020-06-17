// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const request = require('request-promise-native');

class Wikipedia extends Command {
  constructor(client) {
    super(client, {
      name: "wikipedia",
      description: "Searches Wikipedia for the specified article.",
      category: "Searches",
      usage: "wikipedia <Query>"
    });
  }

  async run(message, args, level, settings) { 

    if (!args.length) {
      return message.reply("Command Usage: `wikipedia <text>`")
    }

    let options = {
      url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info|pageimages&exsentences=10&exintro=true&explaintext=true&inprop=url&pithumbsize=512&redirects=1&formatversion=2&titles=${args.join(' ')}`,
      json: true
    };

    let response = await request(options);

    let description = '', data = [], thumbnail = '';
    response = response.query.pages[0];

    if (response.missing) {
      description = `**${args.join(' ')}** was not found in Wikipedia.`;
    }
    else {
      data = [
        {
          name: response.title || args.join(' '),
          value: `${response.extract.length < 1000 ? response.extract : response.extract.slice(0, 950)}... [Read More](${response.fullurl})`
        }
      ];
      thumbnail = response.thumbnail ? response.thumbnail.source : 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png';
    }

    await message.channel.send({
      embed: {
        title: 'Wikipedia',
        description: description,
        fields: data,
        thumbnail: {
          url: thumbnail
        },
        footer: {
          text: 'Powered by Wikipedia'
        }
      }
    });
  };
}

module.exports = Wikipedia;
