const BaseCommand = require("../../base/BaseCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class Resume extends BaseCommand {
  constructor() {
    super({
      name: "resume",
      enabled: true
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
    const resumed = queue.setPaused(false);
    if (resumed) {
      const embed = new MessageEmbed()
        .setAuthor(
          "Demandé par " +
            interaction.user.username +
            "#" +
            interaction.user.discriminator,
          interaction.user.displayAvatarURL()
        )
        .setTitle(":white_check_mark: | Le titre a bien été repris !")
        .setThumbnail(queue.nowPlaying.thumbnail)
        .setTimestamp()
        .setFooter("Fait avec 💖 par Yan Jobs#0001 pour Sohran")
        .setColor("#feab0b");
      interaction.reply({
        embeds: [embed]
      });
    }
  }
};
