<a name="top"></a>
![JavaScript Badge](https://img.shields.io/badge/JavaScript-000?logo=javascript&logoColor=F7DF1E&style=for-the-badge)
![Discord Badge](https://img.shields.io/badge/Discord-000?logo=discord&logoColor=5865F2&style=for-the-badge)

# EchoBot
My third DiscordJS bot, developed in 2022.

This bot was developed for a videogame friend group Discord server. The bot did the following:
1. Connected with a MongoDB database to store user-submitted server banners
2. Shuffled submitted banners on a set timer
3. Allowed us to directly request the API for features that weren't rolled out in the desktop app, forum channels at the time
4. Notified staff members when an application form was submitted using Google Forms and a Discord Webhook
5. At one point, it was made to track messages that got reacted to with a specific emoji

Not included in this repo is the .env file containing private variables to connect with MongoDB and Discord's API, as well as the .gs file responsible for sending webhooks to the server from the Google Form.
