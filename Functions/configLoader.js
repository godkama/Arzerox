const configDatabase = require("../Schemas/MemberLog");

async function loadConfig(client) {
  (await configDatabase.find()).forEach((doc) => {
    client.guildConfig.set(doc.Guild, {
      logChannel: doc.logChannel,
      memberRole: doc.memberRole,
      botRole: doc.botRole,
    });
  });

  return console.log("Loaded Guild Configuration to the collection.");
}
async function loadConfig(bloxiacrown) {
  (await configDatabase.find()).forEach((doc) => {
    bloxiacrown.guildConfig.set(doc.Guild, {
      logChannel: doc.logChannel,
      memberRole: doc.memberRole,
      botRole: doc.botRole,
    });
  });

  return console.log("Loaded Guild Configuration to the collection.");
}

module.exports = { loadConfig };
