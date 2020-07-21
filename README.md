# Celestia Discord Bot

Celestia ©2018-2020 Azura Apple#0955

A Discord Bot with focus on Fun, Moderation, Economy, Utility commands and much more.

YOU ARE FREE TO USE ITS CODE AS REFERENCE FOR YOUR OWN BOTS. 

**I am not testing every single command, I would really appreciate it that if you would find any errors that may occurr, to open an issue and I'll fix them as fast as I can!**

## Table of Contents

- [Permissions](#permissions)
- [Interesting Information](#interesting-information)
- [Installing](#installing)
	* [Before You Begin](#before-you-begin)
	* [Windows](#windows)
	* [Mac](#mac)
	* [Ubuntu and other Debian-based systems](#ubuntu-and-other-debian-based-systems)
- [Filling out the .env file](#filling-out-the-env-file)
	* [Bot-related Information](#bot-related-information)
	* [System](#system)
    * [Emoji IDs](#emoji-ids-all-of-them-are-totally-optional)
    * [Roles](#roles)
    * [API KEYS, Secrets, and more](#api-keys-secrets-and-more)
	* [Feedback Command](#feedback-command)
	* [Imgur Album IDs](#imgur-album-ids)
- [Commands](#commands)
	* [Action](#action)
	* [Anime](#anime)
	* [Bot Owner](#bot-owner)
	* [Core](#core)
	* [Games](#games)
	* [Info](#info)
	* [Moderation](#moderation)
	* [NSFW](#nsfw)
	* [Other](#other)
	* [Productivity](#productivity)
	* [Profile](#profile)
	* [Random Image](#random-image)
	* [Random Response](#random-response)
	* [Searches](#searches)
	* [Text](#text)
- [Licensing](#licensing)

## Permissions

The bot needs several permissions to be able to do what it does. Below
is every permission the bot asks for:

- **Create Instant Invite** is needed to allow owners to join your server to test if needed.
- **View Audit Log** is not needed yet, but is something the bot might utilize in the future.
- **Change Nickname** is not needed, but is included as a basic permission.
- **View Channels** is required for every single command to work.
- **Send Messages** is required for every single command to work.
- **Manage Messages** allows the bot to use the `clear` command.
- **Embed Links** is required to allow commands that send embeds to work. A whole bunch of commands use this.
- **Attach Files** is required to allow commands that send files to work. A whole bunch of commands use this.
- **Read Message History** allows the bot to use the `last-message` and `clear` commands.
- **Use External Emojis** allows the bot to use custom emoji in certain commands.
- **Add Reactions** allows the bot to use commands that add reactions to messages in certain commands.


## Interesting Information
- 180+ commands
- 22,000+ lines of code
- 2 years of development
- 300+ Commits

## Installing

### Before You Begin

1. Make sure you have installed [Node.js](https://nodejs.org/en/) (you will need **at least v12.0.0**) and [Git](https://git-scm.com/).
2. Clone this repository with `git clone https://github.com/AzuraApple/celestia.git`.
3. Run `cd celestia` to move into the folder that you just created.
4. Create a file named `.env` and fill it out as shown in `.env.example`.

### Windows

1. Open an **ADMIN POWERSHELL** window.
2. Run `npm i -g --production windows-build-tools`
3. Run `npm i --production` in the folder you cloned the bot.
4. After filling out the .env file, you can start the bot by running `node celestia.js`.

### Mac

1. Launch **TERMINAL** (can be found in Utilities folder)
2. Run `xcode-select --install`
3. You should now see a software update popup asking you the following: "The xcode-select command requires the command line developer tools. Would you like to install the tools now?" Click on the Install button to confirm, then Agree to the License Agreement when requested (have fun reading through that).
All the command line developer tools will be installed to the /Library/Developer/CommandLineTools/ directory.
4. After filling out the .env file, you can start the bot by running `node celestia.js`.

### Ubuntu and other Debian-based systems

1. Run `apt update`.
2. Run `apt upgrade` to install the latest dependencies of your distro.
3. Run `apt install python` to install python.
4. Run `npm i --production` in the folder you cloned the bot.
5. After filling out the .env file, you can start the bot by running `node celestia.js`.

## Filling out the .env file

Getting _all_ the API keys for your `.env` file can be a pain sometimes, that's why I've compiled a list here of where to go to get every single API key!

### Bot-related Information
* `CELESTIA_TOKEN=` is the bot's token. You can get it from [here](https://discord.com/developers/applications/).
* `CELESTIA_PREFIX=` is the default prefix of the bot. Can be changed to anything you want. Default is c.
* `CELESTIA_ID=` is the ID of your bot. This is so far only used for the `rate` command (yet).
* `CELESTIA_INVITE_LINK=` is an invite link for the bot. As example: `https://discordapp.com/oauth2/authorize?client_id=1234567891011&scope=bot&permissions=0123456789`

### System
* `ADMIN=` Bot Admin User ID. Not required, and totally optional.
* `SUPPORT=` Bot Support User ID. Not required, and totally optional.
* `SYSTEM_NOTICE=` Leave this to `true`, which is set by default. This shouldn't be touched.

### Emoji IDs (All of them are totally optional!)
* `BAN_EMOJI_ID=` is used by the Moderation commands `ban` and `forceban`.
* `FEEDBACK_EMOJI_ID=` is used by the Core command `feedback`.
* `GEM_EMOJI_ID=` is used by the Economy commands. As example, Celestia uses Gems as currency system, aka a custom Gem emoji to actually display the currency.
* `KICK_EMOJI_ID=` is used by the Moderation command `kick`.
* `REPORT_EMOJI_ID=` is used by the Moderation command `report`. 
* `WARN_EMOJI_ID=` is used by the Moderation command `warn`.

### Roles
_Feel free to change these roles for your server. It's not required to change them though. Defaults below. Those are for the permission level function, so that the bot knows who is an Admin, Moderator, or user._

* `MOD_ROLE=` Moderator role on a server. Default is `Moderator`.
* `ADMIN_ROLE=` Admin role on a server. Default is `Administrator`.

### API KEYS, Secrets, and more
* `BITLY_KEY=` can be obtained by getting a [Generic Access Token](https://bitly.is/accesstoken).
* `CLEARBIT_KEY=` can be obtained at the [Clearbit dashboard](https://dashboard.clearbit.com/login).
* `GOOGLE_API=` can be obtained by going to the Google API. You need to create a new Application on the [Google Cloud Console](https://console.cloud.google.com/home/dashboard). After that, enable the [YouTube Data API](https://console.cloud.google.com/marketplace/product/google/youtube.googleapis.com?q=youtube&id=125bab65-cfb6-4f25-9826-4dcc309bc508&project=azura-278914&hl).
* `GIPHY_API_KEY=` can be obtained by going to the [Giphy API Page](https://developers.giphy.com/).
* `GITHUB_USERNAME=` is the username of your GitHub account.
* `GITHUB_PASSWORD=` is the password of your GitHub account. 
* `CELESTIA_GITHUB_REPO_USERNAME=` is your username, as example `AzuraApple`.
* `CELESTIA_GITHUB_REPO_NAME=` is the name of your repository, as example `celestia`.
* `IMGUR_KEY=` can be obtained by [Registering an Application at the Imgur website](https://imgur.com/signin?redirect=https%3A%2F%2Fapi.imgur.com%2Foauth2%2Faddclient).
* `OSU_KEY=` can be obtained by [signing up at the osu! API page](https://osu.ppy.sh/forum/ucp.php?mode=login). Whether this link takes you to the right page or not is hit-or-miss.
* `THECATAPI_KEY=` can be obtained by going to the [Cat API](https://thecatapi.com/).
* `UNSPLASH_ACCESS_KEY=` can be obtained by going to the [Unsplash Image API](https://unsplash.com/developers).
* `WEBSTER_KEY=` can be obtained by going to the [Dictionary API website](https://dictionaryapi.com/). Find the "GET STARTED USING OUR API" section.

### Feedback Command
_This is a Channel ID for the channel you want to view feedback from. It's not really required, so delete it, with the feedback command, if you don't want or need it._

`FEEDBACK_CHANNEL=` is simply the channel ID of any channel in the main server the bot should be in.

### Imgur Album IDs
As all of these keys are the same process, this is a little different. You need to first sign up for Imgur. Then you just need to go to your profile and make albums that contain the images for the command(s) you want to use. Use the ID of that album (look at the URL) as the variable. Yes, you need to fill these albums yourself.

## Commands

**Total Commands: 189**

### Action

Action Commands: 10

* **hand:** Holds hands with the user you mentioned!
* **hug:** Hugs the user you mentioned!
* **kiss:** Kisses the user you mentioned!
* **lick:** Licks the user you mentioned!
* **nom:** Noms on the user you mentioned!
* **pat:** Pats the user you mentioned on the head!
* **slap:** Slaps the user you mentioned!
* **stare:** Stares at the user you mentioned!
* **tickle:** Tickles the user you mentioned!
* **wink:** Winks at the specified user!

### Anime

Anime Commands: 5

* **anime:** Searches for an anime on Kitsu.io! If no anime name is given, it gives you a random suggestion!
* **awwnime:** Cute anime girls!
* **booru:** Searches for images on Safebooru! Keep in mind Safebooru's definition of safe!
* **manga:** Searches for a manga with Kitsu.io!
* **waifu:** Finds you a waifu from a database of many waifus! Others can vote on the waifu through reactions!

### Bot Owner

Bot Owner Commands: 10

* **config:** Modifies the default configuration for all guilds.
* **eval:** Evaluates arbitrary JavaScript.
* **exec:** Evaluates arbitrary JavaScript.
* **filesize:** Returns the value of the size of the specified file.
* **leave:** Leaves the current server.
* **nonce:** Sends a random number string used for checking message delivery.
* **reload:** Reloads a command that has been modified.
* **restart:** If running under PM2, the bot will restart.
* **shutodown:** Shuts down Celestia.
* **status:** Sets Celestia's presence/status.

### Core

Core Commands: 11

* **changelog:** Responds with the 10 latest commits.
* **commands:** Displays all commands available for you.
* **donate:** Responds with the bot's donation links.
* **feedback:** Want to give feedback? Encountered any bugs?
* **help:** Displays basic information or help for a command!
* **invite:** Generates an invite link, for adding Celestia to a server.
* **ping:** Shows the bot latency and gives it a rating.
* **prefix:** Returns the command prefix for the current server.
* **settings:** Allows you to view or change settings for your server.
* **stats:** Shows some information about Celestia!
* **terms:** Read Celestia's Terms of Service. 

### Games

Games Commands: 4

* **flip:** Bet Gems on prediction of the outcome of flipping a coin. If you win, you get more of it. But if you lose, you lose the amount you have bet.
* **roll:** Bet Gems on prediction of the outcome of rolling a dice. If you win, you get more of it. But if you lose, you lose the amount you have bet.
* **slots:** Bet Gems on spinning the slot machine! You win if all 3 reels stop at the same emojis. There's also a grand prize if all 3 reels stop at :moneybag:!
* **trivia:** Put your general knowledge to the test and earn Gems!

### Info

Info Commands: 12

* **avatar:** Sends your avatar or the mentioned user's avatar.
* **channel:** Displays information about the current channel.
* **discrim:** Searches for users with the specified discriminator.
* **emoji:** Displays information about the specified emoji.
* **emoji-image:** Sends the specified emoji as an image.
* **icon:** Sends the current server's icon.
* **last-message:** Returns the mentioned user's last message.
* **permission-level:** Displays your permission level for your location.
* **pi:** Returns the value of Pi (π).
* **server:** Displays information about the current server.
* **time:** Returns the current time in a specified timezone.
* **user:** Displays information about the mentioned user.

### Moderation

Moderation Commands: 12

* **ban:** Bans the mentioned user from the server.
* **clear:** Clears (bulk-deletes) between 2 and 99 messages.
* **clear-nickname:** Clears a user's nickname.
* **fetch-bans:** Checks how many users are banned on the current server.
* **force-ban:** Bans a user, even if they aren't in your server.
* **kick:** Kicks the mentioned user from the server.
* **list-bans:** DMs you a list of banned users.
* **lockdown:** Locks a channel down for a set duration. Use \"lockdown release\" to end the lockdown prematurely.
* **mute:** Mutes the mentioned user.
* **report:** Reports a user to the server's staff.
* **unmute:** Undoes the mentioned user's mute.
* **warn:** Warns the mentioned user.

### NSFW

NSFW Commands: 47

NSFW commands won't be listed here for many reasons. If you want to see what kind of NSFW commands this bot has, go to `commands/NSFW`. The bot also has a own command to list all NSFW commands called `nsfwcommands`.

### Other

Other Commands: 4

* **horoscope:** Gets your daily horoscope!
* **lmgtfy:** Why don't you just... Google it?
* **rate:** Gives the item you specify a rating out of 10!
* **tableflip:** Flips a table, in real-time! (╯°□°)╯

### Productivity

Productivity Commands: 11

* **calculate:** Evaluates/calculates a given mathematical expression.
* **capture-screenshot:** Captures a screenshot of a given URL.
* **choose:** Choose an item from a list you provide.
* **color:** Shows a random color or a preview of the given color!
* **create-emoji:** Creates a new emoji.
* **generate-invite:** Generates an invite link of the current text channel of your Discord server.
* **poll:** Starts a poll in the current text channel asking users to vote with the specified time. If no time is specified, poll ends in 60 minutes.
* **prime-number:** Checks if a number is a prime number.
* **reminder:** Sets a reminder for you with the given time.
* **shorten:** Shortens the specified link.
* **translate:** Translates a specific text. A language (e.g. English, German, French, etc.) must be added to specify a language to translate to.

### Profile

Profile Commands: 6

* **buy-item:** Buy something from the item shop!
* **claim:** Claim your daily rewards.
* **item-shop:** Buy Items from the Item Shop!
* **profile:** Displays your amount of Gems and items you currently own.
* **transfer:** Transfer Gems to your friends!
* **work:** Work for a chance to earn Gems!

### Random Image

Random Image Commands: 9

* **bird:** Sends a random image of a bird.
* **bunny:** Sends a random image of a bunny.
* **cat:** Sends a random image of a cat.
* **dog:** Sends a random image of a dog.
* **duck:** Sends a random image of a duck.
* **food:** Responds with a randomly generated food.
* **image:** Sends a random image.
* **image-search:** Sends a random image based on your query.
* **lizard:** Sends a random image of a lizard.

### Random Response

Random Response Commands: 19

* **advice:** Get some advice!
* **button:** Responds with a random 'Will You Press The Button?' situation.
* **cat-fact:** Shows a random fact about cats.
* **celestia-fact:** Sends a fact about the bot.
* **dog-fact:** Shows a random fact about dogs.
* **fortune:** Get a fortune!
* **joke:** Tells a general or programming-related joke.
* **kaomoji:** Displays a random kaomoji! (´・ω・｀) 3000 will definitely be enough to keep you busy! (ｖ｀▽´)ｖ
* **loremipsum:** Need placeholder text for your website? Look no further.
* **magic8ball:** Consults my magic 8-ball!
* **never-have-i-ever:** Responds with a random 'Never Have I Ever...' statement.
* **number-fact:** Responds with a random fact about a specific number.
* **pasta:** Cool custom, random pastas that I make!
* **pickupline:** Get a random pick up line!
* **quote:** Gives you a random quote!
* **rightthere:** Sends a random right there copypasta! May include NSFW language and elements or considered as spam.
* **roast:** Roasts a user.
* **today:** Finds a historical event from today!
* **tsundere:** Get a random tsundere quote!

### Searches

Searches Commands: 15

* **company:** Shows the image and website of the company you provided.
* **define:** Defines the word you provided.
* **forecast:** Shows the weather forecast for 5 days of the specified city.
* **giphy:** Returns a GIF from Giphy based on your query.
* **github:** Returns information about the specified GitHub repository.
* **jisho:** Searches for Japanese words and kanji on Jisho!
* **meme:** Searches for a random meme from selected subreddits! Warning: There is no NSFW filter on this!
* **nasa:** Searches NASA's image archive for your query.
* **osu:** Responds with information on an osu! user.
* **steam:** Searches Steam for games!
* **urban:** Searches the Urban Dictionary for the specified query.
* **weather:** Displays weather information for the specified location.
* **wikipedia:** Searches Wikipedia for the specified article.
* **xkcd:** Searches for a comic on xkcd.
* **youtube:** Searches for your query on YouTube!

### Text

Text Commands: 14

* **clap:** Sends the same message that you had sent, but replaced with clap emojis.
* **cow-say:** Sends the same message that you had sent, but with the cow say style.
* **destruct:** Sends the same message that you had sent, but it will get auto deleted after a specific amount of time.
* **emojify:** Sends the same message that you had sent, but converts it into emoji form.
* **fliptext:** Sends the same message that you had sent, but flipped.
* **leet:** Sends the same message that you had sent, but as leet text.
* **morsecode:** Encodes a given text in Morse Code.
* **piratespeak:** Sends the same message that you had sent, but as pirate speak.
* **reverse:** Sends the same message that you had sent but reversed.
* **say:** Lets me say something for you. Useful for example to create rules or help pages.
* **ship:** Combines two or more mentioned user's names.
* **tapcode:** Encodes a given text in Tap Code.
* **vaportext:** Make text **A E S T H E T I C**.
* **zalgolize:** Sends the same message that you had sent, but zalgolized.


## Licensing
For more information view the `LICENSE` file.
