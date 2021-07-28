module.exports = class PostGuildCommand {
    constructor(name) {
        this.name = name;
    }
    async post(client, guild, data) {
        await client.guild.cache.get(guild)?.commands.create(data).catch((err) => console.log(err));
    }
}