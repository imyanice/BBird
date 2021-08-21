const BaseCommand = require("../../base/BaseCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class NP extends BaseCommand {
  constructor() {
    super({
      name: "nowplaying",
      enabled: true
    });
  }
  async run(client, interaction) {
    if (!client.player.getQueue(interaction.guild.id))
      return interaction.reply(`:x: | Aucune musique en cours de lecture !`);
    const queue = client.player.getQueue(interaction.guild.id);
    const track = queue.nowPlaying(interaction.guild.id);
    const embed = new MessageEmbed()
      .setColor("#feab0b")
      .setAuthor("🎤 | Entrain de jouer : " + track.title)
      .addField(":singer: | Chanteur:", track.author, true)
      .addField(
        ":speaking_head: | Demandé par:",
        track.requestedBy.username +
          "#`" +
          track.requestedBy.discriminator +
          "`",
        true
      )
      .addField(
        ":notes: | Depuis une playlist ?",
        track.fromPlaylist ? "Oui :thumbsup:" : "Non :thumbsdown:",
        true
      )
      .addField(":clock1: | Durée:", track.duration, true)
      .addField(":eyes: | Vue(s):", track.views.toString(), true)
      .addField(":loud_sound: | Volume:", queue.volume.toString(), true)
      .addField(
        "En pause ?",
        queue.connection.paused ? "Oui :thumbsup:" : "Non :thumbsdown:",
        true
      )
      .addField(
        "Progression:",
        queue.createProgressBar({ timecodes: true }),
        true
      )
      .setThumbnail(track.thumbnail)
      .setTimestamp()
      .setFooter("Fait avec 💖 par Yan Jobs#0001 pour Sohran");
    interaction.reply({ embeds: [embed] });
  }
};
