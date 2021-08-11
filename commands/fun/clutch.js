const BaseCommand = require("../../base/BaseCommand");

module.exports = class Clutch extends BaseCommand {
  constructor() {
    super({
      name: "clutch",
      enabled: true
    });
  }
  async run(client, interaction) {
    await interaction.reply({content: ":tada: OMG ! Ce clutch était vraiment inattendue"});
  }
};
