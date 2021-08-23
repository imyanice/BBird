const BaseCommand = require("../../base/BaseCommand");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = class Clutch extends BaseCommand {
  constructor() {
    super({
      name: "clutch",
      enabled: true
    });
  }
  async run(client, interaction) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("enderpearl")
        .setEmoji("879399559476949032")
        .setStyle("PRIMARY")
        .setLabel("Ender pearl clutch !")
    );
    await interaction.reply({
      content: "Ce clutch sera t-il inattendu ?",
      components: [row]
    });
  }
};
