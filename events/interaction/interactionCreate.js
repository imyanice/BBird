const BaseEvent = require("../../base/BaseEvent");

class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super({
      name: "interactionCreate"
    });
  }
  async run(client, interaction) {
    if (interaction.isCommand()) {
      const commandName = interaction.commandName; // Take the command name
      const command = client.commands.get(commandName); // Get the command from our command map
      const data = client.commands.get(commandName).data;
      if (command) {
        // If the command was found
        if (data.enabled) {
          command.run(client, interaction); // Run it
        } else if (
          !data.enabled &&
          interaction.user.id !== "735538297815957584" /* My id :) */
        ) {
          interaction.reply(
            ":x: Cette commande est désactivée ! Réessaye plus tard."
          );
        } else {
          command.run(client, interaction); // Run it if it is me
        }
      }
    }
  }
}

module.exports = InteractionCreateEvent;
