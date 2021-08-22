const BaseCommand = require("../../base/BaseCommand");

class Play extends BaseCommand {
  constructor() {
    super({
      name: "play",
      enebled: true
    });
  }
  async run(client, interaction) {
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
    const query = interaction.options.get("musique").value;
    const queue = client.player.createQueue(interaction.guild, {
      metadata: {
        channel: interaction.channel
      }
    });

    // verify voice channel connection
    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      queue.destroy();
      return await interaction.reply({
        content: ":x: | Je ne peux pas rejoindre ton vocal !",
        empheral: true
      });
    }

    await interaction.deferReply();
    const track = await client.player
      .search(query, {
        requestedBy: interaction.user
      })
      .then((x) => x.tracks[0]);
    if (!track)
      return await interaction.followUp({
        content: `❌ | La musique **${query}** n'as pas été trouvé`
      });

    queue.play(track);

    return await interaction.followUp({
      content: `⏱️ | **${track.title}** a été ajouté à la liste d'attente !`
    });
  }
}

module.exports = Play;
