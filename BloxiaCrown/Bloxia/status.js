// Commande status
const { Client, Message, EmbedBuilder } = require("discord.js");
const util = require("minecraft-server-util");

module.exports = {
  name: "status",
  description: `get bloxia status`,
  bloxia: true,
  /**
   *
   * @param {Message} message
   * @param {*} args
   * @param {Client} client
   */
  execute(message, args, commandName, Discord) {
    return util
      .status("play.bloxia.fr", 25565)
      .then((response) => {
        const embed = new EmbedBuilder()
          .setColor("#ffffff")
          .setTitle("BLOXIA SERVERS STATUS")
          .setDescription(
            `\`\`\`fix\nServer IP : play.bloxia.net
            \nServer Name : ${response.motd.clean}
            \nOnline Players : ${response.players.online}
            \nMax Players : ${response.players.max}\`\`\``
          )
          .setFooter({ text: "Dev by Kama#3746" });

        message.channel.send({ embeds: [embed] });
      })
      .catch((error) => {
        message.channel.send(":x: An error occured.");
        throw error;
      });
  },
};
