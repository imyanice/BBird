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
          client.logger.log(
            `The command: ${data.name} was runned by ${interaction.user.username}#${interaction.user.tag} in ${interaction.guild.id} !`,
            "cmd"
          );
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
    } else if (interaction.isButton()) {
      const buttonName = interaction.customId; // Take the command name
      const button = client.buttons.get(buttonName); // Get the command from our command map
      if (button) {
        const data = client.buttons.get(buttonName).data;
        // If the command was found
        if (data.enabled) {
          button.run(client, interaction); // Run it
          client.logger.log(
            `The command: ${data.customId} was runned by ${interaction.user.username}#${interaction.user.tag} in ${interaction.guild.id} !`,
            "cmd"
          );
        } else if (
          !data.enabled &&
          interaction.user.id !== "735538297815957584" /* My id :) */
        ) {
          interaction.reply(
            ":x: Ce boutton est désactivée ! Réessaye plus tard."
          );
        } else {
          button.run(client, interaction); // Run it if it is me
        }
      }
    }
  }
}

module.exports = InteractionCreateEvent;
