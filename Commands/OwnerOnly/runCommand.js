const { exec } = require("node:child_process");

const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  owneronly: true,
  developer: false,
  data: new SlashCommandBuilder()
    .setName("runcommand")
    .setDescription("Running console command.")
    .addStringOption((option) =>
      option.setName("input").setDescription("Command to run").setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const input = interaction.options.getString("input");
    const outputEmbed = new EmbedBuilder()
      .setAuthor({ name: "Output :" })
      .setColor("Aqua");

    exec(input, async (err, output) => {
      // once the command has completed, the callback function is called
      if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err);
        await interaction.reply("couldn't execute command");
        return;
      }
      // log the output received from the command
      console.log("Output: \n", output);
      await interaction.reply({ embeds: [outputEmbed.setDescription(output)] });
    });
  },
};
