const BaseEvent = require("../../base/BaseEvent");
const { MessageEmbed } = require("discord.js");

module.exports = class GuildBanAdd extends BaseEvent {
  constructor() {
    super({
      name: "guildBanAdd"
    });
  }
  async run(client, ban) {
    if (
      !ban.guild.members.cache
        .get(client.user.id)
        .permissions.has("VIEW_AUDIT_LOG") ||
      !ban.guild.members.cache
        .get(client.user.id)
        .permissions.has("MANAGE_WEBHOOKS")
    )
      return console.log("pas de perm");
    const embed = new MessageEmbed()
      .setAuthor("Action de Modération | Ban !", ban.user.displayAvatarURL())
      .setTitle(
        `${ban.user.username}\`#${ban.user.discriminator}\` s'est fait bannir !`
      )
      .addField(
        "🤖 | Est-ce un bot ?",
        `${ban.user.bot ? "👍 Oui !" : "👎 Non !"}`,
        true
      )
      .addField("#️⃣ | ID:", `${ban.user.id}`, true)
      .addField(
        "👨 | Tag:",
        `${ban.user.username}\`#${ban.user.discriminator}\``,
        true
      )
      .setTimestamp()
      .setFooter("Fait avec 💖 par Yan Jobs#0001 pour Sohran")
      .setColor("#feab0b");
    setTimeout(async () => {
      const logs = await ban.guild
        .fetchAuditLogs(1, null, 22)
        .catch((e) => console.log(e));
      console.log(logs);
      if (!logs) return;
      const log = logs.entries.find((e) => e.target.id === ban.user.id);
      console.log(log);
      if (!log) return;
      const author = log.executor;
      if (log.reason) {
        embed.addField("❓ | Raison:", `${log.reason}`, true);
      }
      embed.addField(
        "🔨 | Auteur:",
        `${author.username}\`#${author.discriminator}\` (${author.toString()})`,
        true
      );
      client.channels.cache
        .get(client.config.logChannel)
        .send({ embeds: [embed] });
    }, 1000);
  }
};
