const { ChatInputCommandInteraction } = require("discord.js");
const { loadEvents } = require("../../../Handlers/eventHandler");

module.exports = {
  subCommand: "reload.events",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    for (const [key, value] of client.events) loadEvents(client);
    client.removeListener(`${key}, value, true`);
    interaction.reply({
      content: "Developer Reloaded Events",
      ephemeral: false,
    });
  },
};
