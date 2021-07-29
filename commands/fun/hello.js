const BaseCommand = require("../../base/BaseCommand");

module.exports = class Hello extends BaseCommand {
  constructor() {
    super({
      name: "hello"
    });
  }
  async run(client, interaction) {
    await interaction.reply("Hello world !");
  }
};
