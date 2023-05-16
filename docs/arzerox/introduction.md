# Introduction

### ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge\&logo=mongodb\&logoColor=white) ![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge\&logo=paypal\&logoColor=white) ![Ko-Fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge\&logo=ko-fi\&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge\&logo=node.js\&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge\&logo=javascript\&logoColor=%23F7DF1E) ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge\&logo=discord\&logoColor=white)

## F.A.Q





#### Commit Your Code

Once you've setup your push origin, you will want to push everytime you change something in your code. Using Arzerox's code, you will have two options to push :

**Manual Commit**

To commit your manually, you can open one of these two :

* Git Bash
* Command Prompt

Once you've opened one of them, run these three commands :

```
git add *
git commit -m "Commit Name"
git push origin main
```

**Automatic Commit**

You don't necessarily have to run all the commands manually, you can use one of Arzerox's automation files. To commit automatically, you will want to open one of the following :

* Git Bash
* Command Prompt

Then, you will want to run `./commit.bat` in your console.

#### Configuration

**Create a .env File**

Go to your `Settings` folder, and right click => Create a new file

[![Djs](https://media.discordapp.net/attachments/1063751938371502100/1063752093413941268/image.png)](https://bit.ly/arzerox\_bot)

Name it `.env` . After that, your Settings folder should look like this :

[![Djs](https://media.discordapp.net/attachments/1063751938371502100/1063752849835687956/image.png)](https://bit.ly/arzerox\_bot)

### Commands

#### Create a text command

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
