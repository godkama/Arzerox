//Libraries used

const { Discord, Client } = require('discord.js');
require('dotenv').config();

//Environnement variables

TOKEN = process.env.TOKEN;
PREFIX = process.env.PREFIX


//Client definitions

const client = new Client({
    partials: ["CHANNEL", "MESSAGE"],
    restTimeOffset: 0,
    intents: 513,
})

client.on("ready", () => {
    console.log(`${client.user.username} is online`),
    client.user.setActivity(`${PREFIX}help || Dev by Kama`)
})

client.on("messageCreate", (message) => {
    if (!message.guild) return
    if (message.author.bot) return
    if (!message.content.startsWith(PREFIX)) return
    if (message.content.startsWith(PREFIX + "pouing")){
        message.channel.send({
            content: "pong"
        })
    };
})
client.login(TOKEN)