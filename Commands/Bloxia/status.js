// Commande status
const { Client, Message, EmbedBuilder } = require("discord.js");
const util = require("minecraft-server-util");

module.exports = {
  name: "status",
  description: `get bloxia status`,
  bloxia: true,
  developer: true,
  /**
   *
   * @param {Message} message
   * @param {*} args
   * @param {Client} client
   */
  async execute(message, args, commandName, client, Discord) {
    const statusChannel = client.channels.cache.get("1011231240717881354");
    const servers = [
      { name: "Faction", ip: "node10.bellier.xyz", port: 25620 },
      { name: "Lobby 1", ip: "node10.bellier.xyz", port: 25605 },
      { name: "Authentification", port: 25615, ip: "node10.bellier.xyz" },
      { name: "Proxy", ip: "play.bloxia.fr", port: 25565 },
      { name: "Invest", ip: "node10.bellier.xyz", port: 25603 },
    ];
    const embed = new EmbedBuilder()
      .setColor("#000000")
      .setTitle("BLOXIA SERVERS STATUS")
      .setTimestamp()
      .setFooter({ text: "Dev by Kama#3746" });

    function updateStatus() {
      servers.forEach((server) => {
        util
          .status(server.ip, server.port)
          .then((response) => {
            srvStatus = "<:CV_CouleurVert:1083911929241796628> Online";
            statusChannel.messages
              .fetch("1084053225004601395")
              .then((message) =>
                message.edit({
                  embeds: [
                    embed.addFields({ name: server.name, value: srvStatus }),
                  ],
                })
              );
          })
          .catch((error) => {
            srvStatus = "<:CV_Attention:1083911870186012724> Offline";
            statusChannel.messages
              .fetch("1084053225004601395")
              .then((message) =>
                message.edit({
                  embeds: [
                    embed.addFields({ name: server.name, value: srvStatus }),
                  ],
                })
              );
          });
      });
    }
    updateStatus();
    setInterval(() => {
      embed.spliceFields(0, 5);
      embed.setTimestamp();
      updateStatus();
    }, 60000);
  },
};
