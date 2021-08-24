const { Client, Intents, Collection } = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
const { Player } = require("discord-player");
const Database = require("easy-json-database");

class Sohran extends Client {
  constructor() {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.DIRECT_MESSAGES
      ]
    });

    this.config = require("../config");
    this.commands = new Collection();
    this.events = new Collection();
    this.buttons = new Collection();
    this.db = new Database("./database.json", {
      snapshots: {
        enabled: true,
        interval: 24 * 60 * 60 * 1000,
        folder: "./backups/"
      }
    });
    this.logger = require("../utils/logger");
    this.giveawaysManager = new GiveawaysManager(this, {
      storage: "./giveaways.json",
      updateCountdownEvery: 10000,
      default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
      }
    });
    this.player = new Player(this);
    // Player events
    this.player.on("trackStart", (queue, track) => {
      queue.metadata.channel.send(
        "🎶 | Entrain de jouer: **" + track.title + "** !"
      );
    });
    this.player.on("channelEmpty", (queue) => {
      queue.metadata.channel.send(
        "❌ | Plus personne n'est connecté, déconnection..."
      );
    });
    this.player.on("botDisconnect", (queue) => {
      queue.metadata.channel.send(
        "❌ | J'ai éte déconnécte manuellement, je supprime la file d'attente..."
      );
    });
    this.player.on("queueEnd", (queue) => {
      queue.metadata.channel.send("✅ | Queue terminée !");
    });
  }
}

module.exports = Sohran;
