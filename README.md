# Celestia Discord Bot

Celestia 2.2.4 ©2018-2020 AzuraApple#0955

A Discord Bot with focus on Fun, Moderation, Economy, Utility commands and much more.

YOU ARE FREE TO USE ITS CODE AS REFERENCE FOR YOUR OWN BOTS. 

**Note: I am not testing every single command, I would really appreciate it that if you would find any errors that may occurr, to open an issue and I'll fix them as fast as I can!**

## Filling out the .env / config.js file

*Note: Remove the .example part from both the .env and config.js files, once you are done!*

### Bot-related Information:
* `CELESTIA_TOKEN=` is the bot's token. You can get it from [here](https://discord.com/developers/applications/).
* `CELESTIA_PREFIX=` is the default prefix of the bot. Can be changed to anything you want. Default is c.
* `CELESTIA_ID=` is the ID of your bot. This is so far only used for the `rate` command (yet).

### System:
* `ADMIN=` Bot Admin User ID. Not required, and totally optional.
* `SUPPORT=` Bot Support User ID. Not required, and totally optional.
* `SYSTEM_NOTICE=` Leave this to `true`, which is set by default. This shouldn't be touched.

### Emoji IDs:
`GEM_EMOJI_ID=` is used by the Economy commands. As example, Celestia uses Gems as currency system, aka a custom Gem emoji to actually display the currency. This is totally optional!

### Roles:
*Note:  Feel free to change these roles for your server. It's not required to change them though. Defaults below. Those are for the permission level function, so that the bot knows who is an Admin, Moderator, or user.*
* `MOD_ROLE=` Moderator role on a server. Default is `Moderator`.
* `ADMIN_ROLE=` Admin role on a server. Default is `Administrator`.

### API KEYS, Secrets, and more:
* `BITLY_KEY=` can be obtained by getting a [Generic Access Token](https://bitly.is/accesstoken).
* `CLEARBIT_KEY=` can be obtained at the [Clearbit dashboard](https://dashboard.clearbit.com/login).
* `GOOGLE_API=` You can get the Google API Key by creating a new Application on the [Google Cloud Console](https://console.cloud.google.com/home/dashboard). After that, you need to enable the [YouTube Data API](https://console.cloud.google.com/marketplace/product/google/youtube.googleapis.com?q=youtube&id=125bab65-cfb6-4f25-9826-4dcc309bc508&project=azura-278914&hl).
* `GIPHY_API_KEY=` You can get the Giphy API Key by visiting the [Giphy API Page](https://developers.giphy.com/).
* `OSU_KEY=` can be obtained by [signing up at the osu! API page](https://osu.ppy.sh/forum/ucp.php?mode=login). Whether this link takes you to the right page or not is hit-or-miss.
* `THECATAPI_KEY=` can be obtained by going to the [Cat API](https://thecatapi.com/).
* `UNSPLASH_ACCESS_KEY=` You can get the Unsplash Key by going to the [Unsplash Image API](https://unsplash.com/developers).
* `WEBSTER_KEY=` can be obtained by going to the [Dictionary API website](https://dictionaryapi.com/). Find the "GET STARTED USING OUR API" section.

### Feedback Command
*Note: This is a Channel ID for the channel you want to view feedback from. It's not really required, so delete it, with the feedback command, if you don't want or need it.*
`FEEDBACK_CHANNEL=` is simply the channel ID of any channel in the main server the bot should be in.

## License
For more information view the `LICENSE` file.
