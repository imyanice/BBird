module.exports = class BaseCommand {
  constructor({
    name = null,
    enabled = true,
    memberPermissions = new Array(),
    botPermissions = new Array()
  }) {
    this.data = { name, enabled, memberPermissions, botPermissions };
  }
};
