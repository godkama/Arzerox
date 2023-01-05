//Libraries used

const { Discord, Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { version } = require('env');
require('dotenv').config();

//Environnement variables

TOKEN = process.env.TOKEN;
PREFIX = process.env.PREFIX
CLIENT_ID = process.env.CLIENT_ID
GUILD_ID = process.env.GUILD_ID

//Consts

const rest = new REST({ version: '10' }).setToken(TOKEN);
// Client initialization

// Define client intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// Log into the client
client.login(TOKEN)

// Print messages when connected to client
client.on('ready', () => {
    console.log(`Logged into ${client.user.tag}\n${client.user.username}'s ID is ${client.user.id}\nChange options in ./settings.js\n${client.user.username} is now online.\n\nHistory\n-------`);
})

// Logs messages
client.on('messageCreate', (message) => {
    console.log(message.createdAt.toDateString() + ", " + message.author.tag + " : " + message.content);
});

client.on('interactionCreate', (interaction) => {
   if (interaction.isChatInputCommand)  {
        console.log('Logged ChatInputCommand')
   }
});

async function main() {

    const commands = [{
        name: "order",
        description: "Order something...",
    }];

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands
        });
        client.login(TOKEN)
    } catch (err) {
        console.log(err);
    }
}

main();