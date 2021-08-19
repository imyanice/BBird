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
        .get("873188259092660295")
        ?.commands.create(data)
        .then(() => {
          client.logger.log(
            `The command ${data.name} was successfully posted !`,
            "/"
          );
        })
        .catch((e) => console.log(e));
    }
    client.player.on("trackStart", (queue, track) => {
      queue.metadata.channel.send(
        "🎶 | Entrain de jouer: **" + track.title + "** !"
      );
    });
  }
};
