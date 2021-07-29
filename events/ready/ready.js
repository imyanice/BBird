const BaseEvent = require("../../base/BaseEvent");
const datas = require("../../commands/api/guildDatas");

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super({
      name: "ready"
    });
  }

  async run(client) {
    client.logger.log(
      `Logged as ${client.user.tag} in ${client.guilds.cache.size} !`,
      "ready"
    ); // Console log ready
    for (const data of datas) {
      await client.guilds.cache
        .get("832244628329594910")
        ?.commands.create(data)
        .then(() => {
          console.log(`The command ${data.name} was successfully posted !`);
        })
        .catch((e) => console.log(e));
    }
  }
};
