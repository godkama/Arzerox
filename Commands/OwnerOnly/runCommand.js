const { exec } = require("node:child_process");

const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  owneronly: true,
  data: new SlashCommandBuilder()
    .setName("runCommand")
    .setDescription("Running console command.")
    .addStringOption((option) =>
      option.setName("input").setDescription("Command to run").setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const input = interaction.option.getString("input");
    const outputEmbed = new EmbedBuilder()
      .setAuthor("Output :")
      .setColor("Aqua");

    exec(input, (err, output) => {
      // once the command has completed, the callback function is called
      if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err);
        interaction.reply("couldn't execute command");
        return;
      }
      // log the output received from the command
      console.log("Output: \n", output);
      interaction.reply({ embeds: [outputEmbed.setDescription(output)] });
    });
  },
};
