const { loadCommands } = require("../../Handlers/commandHandler");
const User = require("../../Models/User");
const DBD = require("discord-dashboard");
const Theme = require("dbd-soft-ui");

module.exports = {
  name: "ready",
  once: true,
  async execute(client, ActivityType) {
    if (client.maintenanced == true) {
      client.user.setPresence({
        activities: [
          {
            name: `Currently undergoing maintenance. || Dev By Kama`,
            type: "LISTENING",
          },
        ],
        status: "dnd",
      });
    } else {
      client.user.setPresence({
        activities: [
          {
            name: `${client.guilds.cache.size} Guilds || Dev By Kama`,
            type: ActivityType.LISTENING,
          },
        ],
        status: "online",
      });
    }
    //premium and shit
    const users = await User.find();
    users.forEach((user) => client.userSettings.set(user.Id, user));
    loadCommands(client);
    console.log(
      `Logged into ${client.user.tag}\n${client.user.username}'s ID is ${client.user.id}\nChange options in ./config.json\n${client.user.username} is now online.\nSuccesfully reloaded`
    );

    let allcommands = [];
    await client.commands.forEach((command) =>
      allcommands.push({
        commandName: command.name,
        commandDescription: command.description,
      })
    );

    await DBD.useLicense(client.config.license);

    DBD.Dashboard = DBD.UpdatedClass();

    const dashboard = new DBD.Dashboard({
      port: 8080,
      client: {
        id: client.user.id,
        secret: client.config.SECRET,
      },
      redirectUri: "http://localhost:8080/discord/callback",
      domain: "http://localhost",
      minimalizedConsoleLog: true,
      acceptPrivacyPolicy: true,
      ownerIDs: client.config.DEVID,
      useThemeMaintenance: true,
      useTheme404: true,
      bot: client,
      useThemeMaintenance: true,
      useCategorySet: true,
      underMaintenance: {
        title: "Under Maintenance",
        contentTitle: "This page is under maintenance",
        texts: [
          "We still want to change for the better for you.",
          "Therefore, we are introducing technical updates so that we can allow you to enjoy the quality of our services.",
          "Come back to us later or join our Discord Support Server",
        ],

        // "Must contain 3 cards. All fields are optional - If card not wanted on maintenance page, infoCards can be deleted",
        infoCards: [
          {
            title: "20+",
            subtitle: "Over 20 commands!",
            description: "Look at our commands after our downtime",
          },
          {
            title: "500",
            subtitle: "Text",
            description: "Hi!",
          },
          {
            title: "!",
            subtitle: "Warning",
            description: "Do you even have permission to be here?",
          },
        ],
      },
      theme: Theme({
        customThemeOptions: {
          index: async ({ req, res, config }) => {
            return {
              values: [],
              graph: {},
              cards: [],
            };
          },
        },
        websiteName: "Arzerox Dashboard",
        colorScheme: "black",
        supporteMail: "steamnitz@gmail.com",
        icons: {
          favicon: "https://i.imgur.com/cP0em0G.png",
          noGuildIcon:
            "https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-Circle-1024x1024.png",
          sidebar: {
            darkUrl: "https://i.imgur.com/cP0em0G.png",
            lightUrl: "https://i.imgur.com/cP0em0G.png",
            hideName: true,
            borderRadius: false,
            alignCenter: true,
          },
        },
        preloader: {
          image: "https://i.imgur.com/xcQiw3k.png",
          spinner: false,
          text: "Page is loading",
        },
        index: {
          card: {
            link: { enabled: false },
            category: "Arzerox",
            title: "Arzerox Dashboard",
            description: "Arzerox Management Panel",
            image: "https://i.imgur.com/xcQiw3k.png",
            footer: "Dev by Kama",
          },
          information: {
            title: "Informations",
            description:
              "Arzerox is the best bot you can use for your server! You can have custom commands by contacting the owner, access to premium features and even your own CUSTOM BOT by paying the owner in exchange of the hosting!\n\nDev by Kama#3746",
          },

          graph: {
            enabled: false,
            lineGraph: false,
            title: "Memory Usage",
            tag: "Memory (MB)",
            max: 100,
          },
        },
        sweetalert: {
          errors: {},
          success: {
            login: "Successfully logged in.",
          },
        },
        preloader: {
          image: "https://i.imgur.com/xcQiw3k.png",
          spinner: false,
          text: "Page is loading",
        },
        admin: {
          pterodactyl: {
            enabled: false,
            apiKey: "ptlc_E7Il0p9C0rxDFq4Ub3bQbZO0oxURjDO4mkyJ2kzcI8h",
            panelLink: "https://control.bot-hosting.net/server/235a7780",
            serverUUIDs: [],
          },
        },
        commands: {
          pageTitle: "All Commands",
          table: {
            title: "All current commands.",
            subtitle:
              "Note: Not all guilds have access to all commands. For example the status command is only available in Bloxia.",
            list: allcommands,
          },
        },
      }),
      settings: [
        {
          categoryId: "admin",
          categoryName: "Administration",
          categoryDescription: "Manage the administration module.",
          getActualSet: async ({ guild }) => {
            const data = new Promise((resolve, reject) => {
              client.db.query(
                `SELECT * FROM server WHERE guild = '${guild}'`,
                async (err, req) => {
                  req[0].maintenance === true ? resolve(true) : resolve(false);
                }
              );
            });
            return await [{ optionId: "maintenance", data: await maintenance }];
          },
          categoryOptionsList: [
            {
              optionID: "maintenance",
              optionName: "Maintenance Mode",
              optionDescription: "Toggle Maintenance Mode On/Off",
              optionType: DBD.formTypes.switch(false),
            },
          ],
        },
      ],
    });

    dashboard.init();
  },
};
