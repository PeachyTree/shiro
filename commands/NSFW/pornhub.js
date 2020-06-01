// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const Pornsearch = require('pornsearch').default;
const errors = require('../../assets/json/command/errors');

class Pornhub extends Command {
    constructor(client) {
        super(client, {
            name: 'pornhub',
            description: 'Searches for videos on Pornhub!\nThis command can only be used in NSFW channels!',
            category: 'NSFW',
            usage: 'c.pornhub <Query>]',
            guildOnly: true
        });
    }

    async run(message, args, level, settings) {

        let errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        let s = message.content.split(/\s+/g).slice(1).join(" ");

        if (!s) {
            return message.channel.send('Please provide me something to search for!')
        }

        let Searcher = new Pornsearch(s);

        try {
            Searcher.videos()
                .then(videos => message.channel.send(videos[1].url));

            return null;

        } catch (err) {
            return message.channel.send(`No search results found for **${s}**`)
        }
    }
}

module.exports = Pornhub;