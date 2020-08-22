const devlinkRepository = require('../repositories/devlink.repository');

const devlinkService = {
  async getAll() {
    const devlinks = await devlinkRepository.findAll();
    return devlinks;
  },
  async add() {
    const newDevlink = await devlinkRepository.create();
    return newDevlink;
  },
};

module.exports = devlinkService;
