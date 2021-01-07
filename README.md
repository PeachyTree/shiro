# Celestia (Codename Mitorisia) Discord Bot

Celestia ©2018-2021 Shin#0484

A Discord Bot with focus on Fun, Moderation, Utility commands and much more.

YOU ARE FREE TO USE ITS CODE AS REFERENCE FOR YOUR OWN BOTS. 

## IMPORTANT INFORMATION
I am going to make a rewrite of this bot, since 80% of this code is outdated. 
The old code will still stay here, until the rewrite is done. 
Information on this readme file will also be removed, except the `Filling out the .env file` section.

## Table of Contents

- [Interesting Information](#interesting-information)
- [Filling out the .env file](#filling-out-the-env-file)
	* [Bot-related Information](#bot-related-information)
	* [System](#system)
    * [Emoji IDs](#emoji-ids-all-of-them-are-totally-optional)
    * [API KEYS, Secrets, and more](#api-keys-secrets-and-more)
	* [Imgur Album IDs](#imgur-album-ids)
- [Licensing](#licensing)

## Interesting Information
- 160+ commands
- 22,000+ lines of code
- 3 years of development
- 400+ Commits

## Filling out the .env file

Getting _all_ the API keys for your `.env` file can be a pain sometimes, that's why I've compiled a list here of where to go to get every single API key!

### Bot-related Information
* `CELESTIA_TOKEN=` is the bot's token. You can get it from [here](https://discord.com/developers/applications/).
* `CELESTIA_PREFIX=` is the default prefix of the bot. Can be changed to anything you want. Default is `c.`
* `CELESTIA_ID=` is the ID of your bot. This is so far only used for the `rate` command.
* `CELESTIA_INVITE_LINK=` is an invite link for the bot. As example: `https://discordapp.com/oauth2/authorize?client_id=1234567891011&scope=bot&permissions=0123456789`

_This is a Channel ID for the channel you want to view feedback from. It's not really required, so you can delete it._
* `FEEDBACK_CHANNEL_ID=` is simply the channel ID of any channel in the main server the bot should be in.

### System
* `ADMIN=` Bot Admin User ID. Not required, and totally optional.
* `OWNER=` Bot Owner User ID. Used for Bot Owner commands. 
* `SUPPORT=` Bot Support User ID. Not required, and totally optional.

_Feel free to change these roles for your server. It's not required to change them though. Defaults below. Those are for the permission level function, so that the bot knows who is an Admin, Moderator, or user._
* `MOD_ROLE=` Moderator role on a server. Default is `Moderator`.
* `ADMIN_ROLE=` Admin role on a server. Default is `Administrator`.

### Emoji IDs (All of them are totally optional!)
* `BAN_EMOJI_ID=` is used by the Moderation commands `ban` and `forceban`.
* `FEEDBACK_EMOJI_ID=` is used by the Core command `feedback`.
* `KICK_EMOJI_ID=` is used by the Moderation command `kick`.
* `REPORT_EMOJI_ID=` is used by the Moderation command `report`. 
* `WARN_EMOJI_ID=` is used by the Moderation command `warn`.

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

### Imgur Album IDs
As all of these keys are the same process, this is a little different. You need to first sign up for Imgur. Then you just need to go to your profile and make albums that contain the images for the command(s) you want to use. Use the ID of that album (look at the URL) as the variable. Yes, you need to fill these albums yourself.

## Licensing
For more information view the `LICENSE` file.