module.exports = class BaseCommand {
  constructor({
    name = null,
    enabled = true
  }) {
    this.data = { name, enabled, memberPermissions, botPermissions };
  }
};
