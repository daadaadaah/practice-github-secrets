const userRepository = require('../repositories/user.repository');

const auth = {
  async login(uid) {
    const user = await userRepository.findByUid(uid);
    return user;
  },

  async signup(newUser) {
    await userRepository.create(newUser);
    return '';
  },
};

module.exports =  auth;
