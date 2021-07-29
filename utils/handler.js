const path = require("path"); // Require the path library
const fs = require("fs").promises; // Require the fs promise library
const BaseEvent = require("../base/BaseEvent"); // Require the base event file
const BaseCommand = require("../base/BaseCommand"); // Require the base command file

async function registerCommands(
  client,
  dir = "" /* If there is no directory specified it is equal to:' '*/
) {
  // Create the function
  const filePath = path.join(__dirname, dir); // Get the file path
  const files = await fs.readdir(filePath); // Read all the files in the path directory
  for (const file of files) {
    // For a file in the files
    const stat = await fs.lstat(path.join(filePath, file)); // Get the data from the file
    if (stat.isDirectory()) {
      // If the file is a dir
      await registerCommands(client, path.join(dir, file)); // Re execute the function with the file who is a dir (that's so hard to explain sry)
    } else if (file.endsWith(".js")) {
      // If the file is a js file
      const Command = require(path.join(filePath, file)); // Load the file data
      if (Command.prototype instanceof BaseCommand) {
        // If the file is an instance of our base command file
        const cmd = new Command(); // Create a new command
        await client.commands.set(cmd.name, cmd); // Set the command in our map
        client.logger.log("🎉  Successfully registered " + cmd.name + " command !", "cmd");
      }
    }
  }
}

async function registerEvents(
  client,
  dir = "" /* If there is no directory specified it is equal to:' '*/
) {
  // Create the function
  const filePath = path.join(__dirname, dir); // Get the file path
  const files = await fs.readdir(filePath); // Read all the files in the path directory
  for (const file of files) {
    // For a file in the files
    const stat = await fs.lstat(path.join(filePath, file)); // Get the data from the file
    if (stat.isDirectory()) {
      // If the file is a dir
      await registerEvents(client, path.join(dir, file)); // Re execute the function with the file who is a dir (that's so hard to explain sry)
    } else if (file.endsWith(".js")) {
      // If the file is a js file
      const Event = require(path.join(filePath, file)); // Load the file data
      if (Event.prototype instanceof BaseEvent) {
        // If the file is an instance of our base event file
        const event = new Event(); // Create a new event
        client.logger.log("🎉  Successfully registered " + event.name + " event !", "event");
        client.on(event.name, event.run.bind(event, client)); // When the event start execute it
      }
    }
  }
}

module.exports = { registerEvents, registerCommands }; // Export the 2 functions