const BaseEvent = require("../../base/BaseEvent");
const swearingChecker = require("../../functions/badwords");

module.exports = class MessageCreateEvent extends BaseEvent {
  constructor() {
    super({
      name: "messageCreate"
    });
  }

  async run(client, message) {
    swearingChecker(message, client);
  }
};
