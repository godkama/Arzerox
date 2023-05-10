const {
  Client,
  ActivityType,
  Partials,
  GatewayIntentBits,
  Collection,
} = require("discord.js");
const fs = require("fs");
const {
  Guilds,
  GuildMembers,
  GuildMessages,
  MessageContent,
  GuildMessageReactions,
} = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { ReactionRole } = require("discordjs-reaction-role");
const discordModals = require("discord-modals");
const client = new Client({
  intents: [
    Guilds,
    GuildMembers,
    GuildMessages,
    MessageContent,
    GuildMessageReactions,
  ],
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
client.buttons = new Collection();

const { connect } = require("mongoose");
connect(client.config.MONGODB_SRV, {}).then(() =>
  console.log(`Client is connected to the DataBase.`)
);

const { GiveawaysManager } = require("discord-giveaways");
const manager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#000000",
    embedColorEnd: "#ff0000",
    reaction: "<a:WhiteCrown:977502005775970304>",
  },
});
client.giveawaysManager = manager;

client.giveawaysManager.on(
  "giveawayReactionAdded",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} entered giveaway #${giveaway.messageId} (${reaction.emoji.name})`
    );
  }
);

client.giveawaysManager.on(
  "giveawayReactionRemoved",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} unreact to giveaway #${giveaway.messageId} (${reaction.emoji.name})`
    );
  }
);

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  console.log(
    `Giveaway #${giveaway.messageId} ended! Winners: ${winners
      .map((member) => member.user.username)
      .join(", ")}`
  );
});

const rr = new ReactionRole(client, [
  {
    messageId: "1074336328470233248",
    reaction: "<:check:1074331873632862288>",
    roleId: "1070725604003041310",
  }, // Custom emoji by ID
]);

loadEvents(client);
loadConfig(client);
discordModals(client);

client.login(client.config.TOKEN);
