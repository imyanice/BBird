const BaseEvent = require("../../base/BaseEvent");

class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super({
      name: "interactionCreate"
    });
  }
  async run(client, interaction) {
    if (interaction.isCommand()) {
      const command = interaction.commandName; // Take the command name
      const commandRegistered = client.commands.get(command); // Get the command from our command map
      if (commandRegistered) {
        // If the command was found
        if (commandRegistered.enabled) {
          commandRegistered.run(client, interaction); // Run it
        } else if (
          !commandRegistered.enabled &&
          interaction.user.id !== "735538297815957584" /* My id :) */
        ) {
          interaction.reply(
            ":x: Cette commande est désactivée ! Réessaye plus tard."
          );
        } else {
          commandRegistered.run(client, interaction); // Run it if it is me
        }
      }
    }
  }
}

module.exports = InteractionCreateEvent;
