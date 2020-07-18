const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { shorten, base64, embedURL } = require('../../util/Utils');
const { GITHUB_USERNAME, GITHUB_PASSWORD, CELESTIA_GITHUB_REPO_USERNAME, CELESTIA_GITHUB_REPO_NAME } = process.env;

class Changelog extends Command {
    constructor(client) {
        super(client, {
        name: "changelog",
        description: "Responses with the 10 latest commits.",
        category: "Core",
        usage: "changelog",
        });
    }

    async run(message) {
        const { body } = await request
            .get(`https://api.github.com/repos/${CELESTIA_GITHUB_REPO_USERNAME}/${CELESTIA_GITHUB_REPO_NAME}/commits`)
            .set({ Authorization: `Basic ${base64(`${GITHUB_USERNAME}:${GITHUB_PASSWORD}`)}` });
        const commits = body.slice(0, 10);
        const embed = new MessageEmbed()
            .setTitle(`[${CELESTIA_GITHUB_REPO_NAME}:master] Latest 10 commits`)
            .setColor(0x7289DA)
            .setURL(`https://github.com/${CELESTIA_GITHUB_REPO_USERNAME}/${CELESTIA_GITHUB_REPO_NAME}/commits/master`)
            .setDescription(commits.map(commit => {
                const hash = embedURL(`\`${commit.sha.slice(0, 7)}\``, commit.html_url, false);
                return `${hash} ${shorten(commit.commit.message.split('\n')[0], 50)} - ${commit.author.login}`;
            }).join('\n'));
        return message.channel.send({ embed });
    }
}

module.exports = Changelog;