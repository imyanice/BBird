const BaseCommand = require("../../base/BaseCommand");
const { MessageEmbed } = require("discord.js");

class Queue extends BaseCommand {
  constructor() {
    super({
      name: "queue",
      enebled: true
    });
  }
  async run(client, interaction) {
    if (!client.player.getQueue(interaction.guild.id))
      return interaction.reply(`:x: | Aucune musique en cours de lecture !`);
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: ":x: | Tu n'es pas dans un vocal...",
        empheral: true
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content: ":x: | Tu n'es pas dans mon vocal..",
        empheral: true
      });
    const queue = client.player.getQueue(interaction.guild.id);
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
      return `${i + 1}. **${m.title}** ([lien](${m.url}))`;
    });
    const embed = new MessageEmbed()
      .setAuthor(
        "Demandé par " +
          interaction.user.username +
          "#" +
          interaction.user.discriminator,
        interaction.user.displayAvatarURL()
      )
      .setTitle("Voici la file d'attente : ")
      .setTimestamp()
      .setFooter("Fait avec 💖 par Yan Jobs#0001 pour Sohran")
      .setColor("#feab0b");
    if (tracks.length > 0) {
      embed.addField(
        ":notes: | Prochaines pistes:",
        `${tracks.join("\n")}${
          queue.tracks.length > tracks.length
            ? `\n... Il reste:${
                queue.tracks.length - tracks.length === 1
                  ? `${queue.tracks.length - tracks.length} musique.`
                  : `${queue.tracks.length - tracks.length} musiques.`
              }`
            : ""
        }`
      );
    } else if (tracks.length <= 0) {
      embed.addField(
        ":notes: | Prochaines pistes:",
        ":x: | Aucune prochaine piste sur la file d'attente a été trouvé !"
      );
    }

    interaction.reply({
      embeds: [embed]
    });
  }
}

module.exports = Queue;
