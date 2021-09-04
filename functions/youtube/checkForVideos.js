const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const rss = require("rss-converter");

module.exports = async function checkForVideos(client) {
  const feed = await rss.toJson(
    "https://www.youtube.com/feeds/videos.xml?channel_id=" +
      client.config.youtube.channel
  );
  const jsonOpen = fs.readFileSync("./database/videos.json");
  const json = JSON.parse(jsonOpen);
  if (jsonOpen.includes(feed.items[0].yt_videoId)) return;
  json.push(feed.items[0].yt_videoId);
  const jsonLink = JSON.stringify(json);
  fs.writeFileSync("./database/videos.json", jsonLink);
  const embed = new MessageEmbed()
    .setAuthor(
      "Sohran",
      "https://yt3.ggpht.com/ytc/AKedOLQFPA0XVDdk5JToWQQAI4i19wnd2aGTTxzlnarK=s176-c-k-c0x00ffffff-no-rj  "
    )
    .setTitle(feed.items[0].media_group.media_title)
    .setURL(`https://www.youtube.com/watch?v=${feed.items[0].yt_videoId}`)
    .addField("**Description:**", feed.items[0].media_group.media_description)
    .setImage(feed.items[0].media_group.media_thumbnail_url)
    .setTimestamp()
    .setFooter("Fait avec 💖 par Yan Jobs#0001 pour Sohran")
    .setColor("#feab0b");
  client.channels.cache.get("873188259562393636").send({
    content: `Sohran vient de publier une nouvelle vidéo <@&${client.config.roles.ytb}> !\nhttps://www.youtube.com/watch?v=${feed.items[0].yt_videoId}`,
    embeds: [embed]
  });
  return void 0;
};
