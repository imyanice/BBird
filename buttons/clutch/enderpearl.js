const BaseButton = require("../../base/BaseButton");

class EnderPearlClutch extends BaseButton {
  constructor() {
    super({
      customId: "enderpearl",
      enabled: true
    });
  }
  async run(client, interaction) {
    const message = Math.floor(Math.random() * 2);
    switch (message.toString()) {
      case "0": {
        interaction.reply({
          content: ":tada: OMG ! Ce clutch était vraiment inattendu !"
        });
        break;
      }
      case "1": {
        interaction.reply({
          content: ":x: Oh non je n'ai pas fait de clutch inattendu !"
        });
        break;
      }
    }
  }
}

module.exports = EnderPearlClutch;
