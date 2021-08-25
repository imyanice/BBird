const BaseEvent = require("../../base/BaseEvent");
const swearingChecker = require("../../functions/badwords");
const { MessageEmbed } = require("discord.js");

module.exports = class MessageCreateEvent extends BaseEvent {
  constructor() {
    super({
      name: "messageCreate"
    });
  }

  async run(client, message) {
    if (!message.guild || message.author.bot) return; // If a message is send in a guild, or by a bot, then ignore it

    swearingChecker(message, client); // If a message contain badwords

    const logChannel = client.config.logChannel;
    if (message.channel.id === logChannel || message.webhookID) return;

    let msg = "";
    if (!message.content) {
      msg = "Aucun contenu, un glitch a été utilisé.";
    } else {
      msg = "`" + message.content + "`";
    }
    const attachments = [];
    message.attachments.forEach((attachement) => attachments.push(attachement));

    const embed = new MessageEmbed()
      .setAuthor(
        "Message de " + message.member.user.tag,
        message.member.user.avatarURL({ format: "png" }),
        message.url
      )
      .addField(
        "Utilisateur :",
        "<@" +
          message.member.user.id +
          "> (ID : *" +
          message.member.user.id +
          "*)"
      )
      .addField("Date et heure :", `<t:${Date.now()}:F>`)
      .addField("Salon :", "<#" + message.channel.id + ">")
      .addField("Message :", msg)
      .setTimestamp()
      .setFooter("Fait avec 💖 par Yan Jobs#0001 pour Sohran")
      .setColor("#feab0b");
    client.channels.cache
      .get(logChannel)
      .send({ embeds: [embed], files: attachments });
  }
};
