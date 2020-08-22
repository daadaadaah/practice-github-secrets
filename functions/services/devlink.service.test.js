const devlinkService = require('./devlink.service');

const devlinkRepository = require('../repositories/devlink.repository');

jest.mock('../repositories/devlink.repository');

describe('devlinkService', () => {
  const newDevlink = {
    url: 'http://123.com',
    writtenAt: "2020/01",
    keyword: {
      "id": 1,
      "name": "Prisma",
      "color": "#0C344B",
      "img": "../assets/images/keyword/prisma.png"
    },
    tags: [
      {
        "id": 1,
        "name": "장단점"
      },
      {
        "id": 2,
        "name": "동작원리"
      },
      {
        "id": 3,
        "name": "사용법"
      }
    ],
    reviews: [
      {
        "id": 1,
        "name": "가독성"
      },
      {
        "id": 2,
        "name": "정보성"
      }
    ],
    createdAt: "2020-02-01 14:10", // 현재 시간
    updatedAt: null, // null
    deletedAt: null, // null
  }

  beforeEach(() => {
    devlinkRepository.create.mockClear();
  });

  describe('getAll', () => {
    beforeEach(async () => {
      devlinkRepository.findAll.mockResolvedValue([newDevlink]);

    });

    it('returns devlinks ', async () => {
      const devlinks = await devlinkService.getAll();

      expect(devlinks).toEqual([newDevlink]);
    });
  });

  describe('add', () => {
    it('creates newDevlink', async () => {
      const result = await devlinkService.add(newDevlink);
      expect(devlinkRepository.create).toBeCalledTimes(1);
      expect(result).toBeFalsy();
    });
  });
});