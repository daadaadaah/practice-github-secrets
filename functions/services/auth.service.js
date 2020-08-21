import userRepository from '../repositories/user.repository.js';

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

export default auth;