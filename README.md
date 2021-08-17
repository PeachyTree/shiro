# Shiro
[![Build Status](https://github.com/PeachyTree/shiro/workflows/Lint/badge.svg?branch=master&event=push)](https://github.com/PeachyTree/shiro/actions)

Shiro is a open-source Discord bot coded in JavaScript with
[discord.js](https://discord.js.org/) using the
[Commando](https://github.com/discordjs/Commando) command framework.

©2017-2021 PeachyTree#8664

## Table of Contents

- [Permissions](#permissions)
- [Fun Information](#fun-information)
- [Installing](#installing)
	* [Before You Begin](#before-you-begin)
	* [Windows](#windows)
	* [Mac](#mac)
	* [Ubuntu and other Debian-based systems](#ubuntu-and-other-debian-based-systems)
- [Filling Out Your .env File](#filling-out-your-env-file)
	* [Discord-related Info](#discord-related-info)
	* [API Keys, IDs, and Secrets](#api-keys-ids-and-secrets)
	* [Imgur Album IDs](#imgur-album-ids)
- [Commands](#commands)
	* [Category](#category)
- [Licensing](#licensing)

## Permissions

Shiro needs several permissions to be able to do what she does. Below
is every permission Shiro asks for, and what commands you lose if you
don't grant that permission.

- **Create Instant Invite** is needed to allow owners to join your server to test if needed.
	* You lose no commands by turning this off, but you might hinder support.
- **View Audit Log** is not needed yet, but is something Shiro might utilize in the future.
- **Change Nickname** is not _needed_, but is included as a basic permission.
- **View Channels** is required for every single command to work.
- **Send Messages** is required for every single command to work.
- **Manage Messages** allows Shiro to use the `say` command to delete your message, but the command will still work without it.
- **Embed Links** is required to allow commands that send embeds to work. Too many commands to list use it.
- **Attach Files** is required to allow commands that send files to work. Too many commands to list use it.
- **Read Message History** is required to allow Shiro to react to messages alongside "Add Reactions".
- **Mention @everyone, @here, and All Roles** is not _needed_, but is included as a basic permission.
- **Use External Emojis** allows Shiro to use custom emoji in certain commands.
	* While the commands benefit from it, it is not required for the commands to work.
- **Add Reactions** allows Shiro to use commands that add reactions to messages in certain commands.
	* While the commands benefit from it, it is not required for the commands to work.
	* "Read Message History" is also required to allow Shiro to react.

## Fun Information

- 500+ commands
- 21,000+ lines of JavaScript
- 45,000+ lines of JSON data
- 4 years of development

## Installing

### Before You Begin

1. Make sure you have installed [Node.js](https://nodejs.org/en/) (you will need **at least v15.0.0**) and [Git](https://git-scm.com/).
	- If on Windows, [make sure to check the box in the section of the installer for "Tools for Native Modules"](https://i.imgur.com/RMrlz2S.png).
2. Clone this repository with `git clone https://github.com/PeachyTree/shiro.git`.
3. Run `cd shiro` to move into the folder that you just created.
4. Create a file named `.env` and fill it out as shown in `.env.example`.

### Windows

1. Run `npm i --production` in the folder you cloned the bot.
2. Run `npm i -g pm2` to install PM2.
3. Run `pm2 start Shiro.js --name shiro` to run the bot.

### Mac

1. Launch TERMINAL (can be found in Utilities folder)
2. Run `xcode-select --install`.
3. You should now see a software update popup asking you the following: "The xcode-select command requires the command line developer tools. Would you like to install the tools now?" 
4. Click on the Install button to confirm, then Agree to the License Agreement when requested (have fun reading through that). All the command line developer tools will be installed to the `/Library/Developer/CommandLineTools/` directory.
5. After filling out the .env file, you can start the bot by running node shiro.js.


### Ubuntu and other Debian-based systems

1. Run `apt update`.
2. Run `apt upgrade` to install the latest dependencies of your distro.
3. Run `apt install python` to install python.
4. Run `apt install libtool` so sodium can compile if necessary. **(Optional)**
5. Run `npm i --production` in the folder you cloned the bot.
6. Run `npm i -g pm2` to install PM2.
7. Run `pm2 start Shiro.js --name shiro` to run the bot.

## Filling Out Your .env File

Getting _all_ the API keys for your `.env` file can be a pain on a
bot this big, I know. That's why I've compiled a list here of where
to go to get _every single API key_. Note, not all of these are free.

### Discord-related Info

* `SHIRO_TOKEN` can be obtained at the [Discord Developer Portal](https://discord.com/developers/applications/).
* `OWNERS` is a comma-seperated list of Discord User IDs.
* `SHIRO_PREFIX` is the prefix you want the bot to have. Like `s?`.
* `INVITE` is an invite link to a Discord server. The whole thing, not just the code.
* `SHIRO_WEBHOOK_ID` is the ID of the webhook you want the `webhook` command to use.
* `SHIRO_WEBHOOK_TOKEN` is the token of the webhook you want the `webhook` command to use.

### API Keys, IDs, and Secrets

Here's where things get LONG. If you're greeted with a log-in page
when clicking any of these links, you'll need an account for that
API. All are free unless otherwise stated.

* `ALPHA_VANTAGE_KEY` can be obtained at the [Alpha Vantage website](https://www.alphavantage.co/support/#api-key).
* `GIPHY_KEY` can be obtained at the [Giphy developer portal](https://developers.giphy.com/).
* `GITHUB_ACCESS_TOKEN` can be obtained by [creating an access token](https://github.com/settings/tokens).
* `GOOGLE_KEY` can be obtained at the [Google Developer Console](https://console.developers.google.com/). Be sure to click "Enable APIs and Services" and enable the following API:
	- [YouTube Data API](https://console.developers.google.com/apis/library/youtube.googleapis.com)
* `GOV_KEY` can be obtained at the [NASA Open APIs portal](https://api.nasa.gov/).
* `IMGUR_KEY` can be obtained by [Registering an Application at the Imgur website](https://api.imgur.com/oauth2/addclient).
* `OPENWEATHERMAP_KEY` can be obtained at the [OpenWeatherMap website](https://openweathermap.org/price). Click "Get API Key" on the plan you want (probably Free).
* `OSU_KEY` can be obtained by [signing up at the osu! API page](https://osu.ppy.sh/p/api/). Whether this link takes you to the right page or not is hit-or-miss.
* `THECATAPI_KEY` can be obtained at the [TheCatAPI website](https://thecatapi.com/).
* `TWITTER_KEY` and `TWITTER_SECRET` can be obtained at the [Twitter developer portal](https://developer.twitter.com/en/apps).
* `UNSPLASH_KEY` can be obtained at the [Unsplash developer portal](https://unsplash.com/developers).
* `USPS_USERID` can be obtained at the [Web Tools API Portal](https://www.usps.com/business/web-tools-apis/).
* `WATTPAD_KEY` can be obtained at the [Wattpad developer portal](https://www.wattpad.com/developer/docs/api).
* `SHIRO_GITHUB_REPO_NAME` and `SHIRO_GITHUB_REPO_USERNAME` are just the username and name of Shiro's repo on GitHub. For example, `PeachyTree` for the username and `shiro` for the name.

### Imgur Album IDs

This section is a bit different, as all of these keys are the same
process. First, [sign up for Imgur](https://imgur.com/). Then, just
go to your profile and make albums that contain the images for the
command you want to use. Use the ID of that album (look at the URL)
as the variable. Yes, you need to fill these albums yourself.

## Commands

Total: SOON

Full command list coming soon...

### Category:

* **command-name:** Command Description.

## Licensing

The bot is licensed under the GPL 3.0 license. See the file `LICENSE` for more
information. If you plan to use any part of this source code in your own bot, I
would be grateful if you would include some form of credit somewhere.
