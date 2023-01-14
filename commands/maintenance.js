const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('maintenance_mode')
		.setDescription('Toggle maintenance on/off')
        .addStringOption(option =>
            option.setName('value')
            .setDescription('Toggle Value')
            .addChoices({
                name: 'on',
                value: "on",
            }, {
                name: 'off',
                value: 'off',
            })),
	async execute(interaction, maintenance_mode) {
        if (interaction.user.id == "851028619337007134"){
            if (interaction.options.getString('value') == 'on') {
                maintenance_mode = true
                interaction.reply(":white_check_mark: Maintenance Mode is on")
            } else if (interaction.options.getString('value') == 'off'){
                maintenance_mode = false
                interaction.reply(':x: Maintenance Mode is off')
            }
        } else {
            interaction.reply(":x: You are not the owner of the bot !")
        }
	},
};