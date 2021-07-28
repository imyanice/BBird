const Sohran = require("./base/Sohran"),
  {
    registerEvents,
    registerCommands,
    registerPostCommands,
  } = require("./utils/handler");

const client = new Sohran();

const init = async () => {
/*   await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await registerPostCommands(client, "../slashCommands"); */
  await client.login(client.config.token);
};

init();

// If there are errors, log them
client
  .on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
  .on("reconnecting", () => client.logger.log("Bot is reconnecting...", "log"))
  .on("error", (e) => client.logger.log(e, "error"))
  .on("warn", (info) => client.logger.log(info, "warn"));

// If there is an unhandledRejection, log it
process.on("unhandledRejection", (err) => {
  console.error(err);
});