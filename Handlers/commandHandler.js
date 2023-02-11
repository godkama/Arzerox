async function loadCommands(client) {
  const { loadFiles } = require("../Functions/fileLoader");
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Commands", "Status");
  const fs = require("fs");

  await bloxiacrown.commands.clear();
  await client.commands.clear();
  await client.subCommands.clear();

  let commandsArray = [];

  const Files = await loadFiles("Commands");

  fs.readdirSync("./Commands/").forEach((dir) => {
    const commands = fs
      .readdirSync(`./Commands/${dir}/`)
      .filter((file) => file.endsWith(".js"));
    for (let file of commands) {
      let pull =
        require(`../Commands/${dir}/${file}`) || require(`../Commands/${file}`);
      if (pull.name) {
        bloxiacrown.commands.set(pull.name, pull);
        client.commands.set(pull.name, pull);
        table.addRow(file, "✅");
      } else {
        table.addRow(
          file,
          "❌ -> Missing a help.name, or help.name is not a string."
        );
        continue;
      }
      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
    }
  });

  Files.forEach((file) => {
    const command = require(file);

    if (command.subCommand)
      return client.subCommands.set(command.subCommand, command);
    if (!command.data) return;
    else client.commands.set(command.data.name, command);

    commandsArray.push(command.data.toJSON());

    table.addRow(command.data.name, "✅");
  });

  client.application.commands.set(commandsArray);
  bloxiacrown.application.commands.set(commandsArray);

  return console.log(table.toString(), "\n✅ Loaded Commands");
}
