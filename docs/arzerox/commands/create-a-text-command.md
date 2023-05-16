# Create a text command

You need to create a command as `./Commands/${folder}/commandname.js` Use this template :

```
const User = require("../../Models/User");
const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "commandname",
  description: `command description`,
  developer: false,
  premium: false,
  owneronly: false,
  bloxia: false,
  /**
   *
   * @param {Message} message
   * @param {*} args
   * @param {Client} client
   */
  async execute(message, args, commandName, client, Discord) {
    //Code
  },
};
```
