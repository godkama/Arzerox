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

// Print messages when connected to client
client.on('ready', () => {
    console.log(`Logged into ${client.user.tag}\n${client.user.username}'s ID is ${client.user.id}\nChange options in ./settings.js\n${client.user.username} is now online.\nSuccesfully reloaded`);
    console.log("\nHistory\n-------")
    client.user.setActivity("Dev by Kama || /log")
})

// Logs messages
client.on('messageCreate', (message) => {
    // console.log(message.createdAt.toDateString() + ", " + message.author.tag + " : " + message.content);
});

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        console.log('Logged ChatInputCommand')
        interaction.reply({ content: `:white_check_mark: You successfully logged ${interaction.options.getString('input')}` })
        console.log(interaction.user.tag + " says " + interaction.options.getString('input'));
        interaction.channel.send(`<@${interaction.user.id}> just logged ` + "`" + `${interaction.options.getString('input')}` + "`" + ` in ${client.user.username}'s console`);
        console.log(interaction.user.username + " : " + interaction.options.getString('link'))
    }
});

async function main() {

    const commands = [{
        name: "log",
        description: "Log something",
        options: [{
            name: "input",
            description: "Log your input",
            type: 3,
            required: true,
            choices: [
                {
                    name: "yoghurt",
                    value: "I LOVE YAOURT",
                },
                {
                    name: "Kama",
                    value: "Kama is a God for developing this amazing bot",
                }
            ],
        },
        {
            name: "msg",
            description: "Log your message",
            type: 3,
            required: false,
        }

        ],
    }];

    try {
        console.clear();
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands
        });
        console.clear();
        client.login(TOKEN)
    } catch (err) {
        console.log(err);
    }
}

main();