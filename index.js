require('dotenv').config()
const Discord = require('discord.js')
const mongoose = require('mongoose')
const { Client, ChannelType, GatewayIntentBits, Partials, ActivityType, ModalBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, InteractionType, PermissionFlagsBits, ApplicationCommandOptionType, AuditLogEvent, Events, ShardEvents } = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
})
const prefix = '!e '
const banners = require('./models/bannerSchema')

function shuffleBanner() {
    /*banners.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count)
        banners.findOne().skip(random).exec(
            function (err, result) {
                client.guilds.cache.get(process.env.guildid).setBanner(result.link)
            })
    })*/
}

client.on('ready', async () => {
    console.log(`${client.user.tag} is running!`)
    client.guilds.fetch(process.env.guildid).then((g) => {
        g.channels.create({ //Create a channel
            name: 'current-projects',
            type: ChannelType.GuildForum, //Make sure the channel is a text channel
        })
    })
    console.log('done')

    //client.user.setPresence({ activities: [{ type: 'PLAYING', name: 'Minecraft' }], status: 'dnd' })
    //shuffleBanner()
    //setInterval(function () { shuffleBanner() }, 1000 * 60 * 60 * 6) //repeats every 6 hours
})

client.on('messageCreate', async message => {
    if (message.content.toLowerCase().startsWith(prefix) && !message.author.bot) {
        const args = message.content.slice(prefix.length).split(/ +/)
        const command = args.shift().toLowerCase()

        if (command === 'ping' && (message.member.permissions.has("ADMINISTRATOR") || message.member.roles.cache.some(r => r.name === "Technician"))) {
            message.channel.send('pong')
        }

        if (command === 'fakeapp' && (message.member.permissions.has("ADMINISTRATOR") || message.member.roles.cache.some(r => r.name === "Technician"))) {
            const exampleEmbed = new MessageEmbed()
                .setColor(33023)
                .setTitle("Form link for User (User#1234)")
                .setURL("https://www.google.com")
            message.channel.send({ embeds: [exampleEmbed] })
        }

        if (command === 'shufflebanner' && (message.member.permissions.has("ADMINISTRATOR") || message.member.roles.cache.some(r => r.name === "Technician"))) {
            shuffleBanner()
            message.reply('Banner Shuffled.')
        }

        if (command === 'addbanner' && (message.member.permissions.has("ADMINISTRATOR") || message.member.roles.cache.some(r => r.name === "Technician"))) {
            const banner = new banners({
                link: args[0]
            })
            await banner.save().then(message.channel.send('Banner saved in database!'))
        }

        if (command === 'forumchannel') {
        }
    }

    if (message.channel.id == 353716583744667649 && message.webhookId) {
        for (let embed of message.embeds)
            if (embed.title.includes('Form link for ')) {
                const discordUser = embed.title.split(/ +/)[4].substring(1, embed.title.split(/ +/)[4].length - 1)
                const user = await client.users.cache.find(user => user.tag == discordUser)
                if (!user) return message.channel.send('User ' + discordUser + ' not found.')
                await user.send('Welcome to the Echo discord server! Click ' + embed.url + ' to see your application.').catch(() => {
                    message.channel.send('User has their DMs closed.')
                })
            }
    }
})

/*mongoose.connect(process.env.srv).then(() => {
    console.log('Connected to Mongoose!')
})*/

client.login(process.env.token)