const db = require('../database');

const devlinkRepository = {
  async findAll() {
    const devlinks = [];

    const docs = await db.collection('devlink').get();
    docs.forEach((doc) => {
      devlinks.push({
        id: doc.id,
        url: doc.data().url,
        writtenAt: doc.data().writtenAt,
        keyword: doc.data().keyword,
        tags: doc.data().tags,
        reviews: doc.data().reviews,
      })
    })

    return devlinks;
  },

  async create(devlink) {
    const doc = await db.collection('devlink').add(devlink);
    const resDevLink = devlink;
    resDevLink.id = doc.id;
    return resDevLink;
  },
};

module.exports = devlinkRepository;
