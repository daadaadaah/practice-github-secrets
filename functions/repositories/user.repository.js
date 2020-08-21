const db = require('../database');

const userRepository = {
  async findByUid(uid) {
    return await db.collection('user').doc(`/${uid}/`).get();
  },
  
  async create(user) {
    return await db.collection('user').doc(`/${user.uid}/`).set(user);
  },

};

module.exports = userRepository;
