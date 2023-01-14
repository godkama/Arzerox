const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, maintenance_mode) {
		if (maintenance_mode = false){
			interaction.reply({ content: `${client.ws.ping}ms`, ephemeral: true });
			wait (2000)
			interaction.editReply('Arzerox Bot')
		} else {
			interaction.reply(":x: Maintenance Mode is on !")
		}
	},
};