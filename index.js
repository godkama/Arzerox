const {
  Client,
  ActivityType,
  Partials,
  GatewayIntentBits,
  Collection,
} = require("discord.js");
const fs = require("fs");
const { Guilds, GuildMembers, GuildMessages, MessageContent } =
  GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require("./Handlers/eventHandler");
const { loadConfig } = require("./Functions/configLoader");

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();
client.guildConfig = new Collection();
client.aliases = new Collection();
client.userSettings = new Collection();
client.maintenanced = false;

const { connect } = require("mongoose");
connect(client.config.MONGODB_SRV, {}).then(() =>
  console.log(`Client is connected to the DataBase.`)
);

loadEvents(client);
loadConfig(client);

client.login(client.config.TOKEN);
