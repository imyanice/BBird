const BaseEvent = require("../../base/BaseEvent");
const datas = require("../../commands/api/guildDatas");

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super("ready");
  }

  async run(client) {
    client.logger.log(
      `Logged as ${client.user.tag} in ${client.guilds.cache.size} !`,
      "ready"
    ); // Console log ready
    datas.forEach(async data => {
      await client.guild.cache
      .get("832244628329594910")
      ?.commands.create(data)
      .catch((err) => console.log(err))
      .then(() => {
        client.logger.log(`Succesfully posted slash command: ${data.name} !`, "/")
      })
    });
  }
};