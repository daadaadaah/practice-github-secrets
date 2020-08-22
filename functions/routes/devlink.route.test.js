const request = require( 'supertest');

const app = require( '../app');

const devlinkService = require( '../services/devlink.service');

jest.mock('../services/devlink.service');

describe('/devlink', () => {
  const devlink = {
    id: '1234',
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
  }

  describe('GET /devlink/all', () => {
    context('when devlinkService.getAll is success', () => {
      beforeEach(() => {
        devlinkService.getAll.mockResolvedValue([devlink]);
      });
  
      it('returns status code of 201 and true', async () => {
        const response = await request(app).get('/devlink/all').send();
  
        expect(response.status).toBe(201);
        expect(response.body).toEqual([devlink]);
      });
    });

    context('when devlinkService.getAll is failed', () => {
      beforeEach(() => {
        devlinkService.getAll.mockRejectedValue('error');
      });
  
      it('returns status code of 500', async () => {
        const response = await request(app).get('/devlink/all').send();
  
        expect(response.status).toBe(500);
        expect(response.text).toEqual('error');
        expect(response.body).toEqual({});
      });
    });
    
  });

  describe('POST /devlink', () => {
    context('when devlinkService.add is success', () => {
      beforeEach(() => {
      devlinkService.add.mockResolvedValue(devlink);
    });

    it('returns status code of 201 and true', async () => {
      const response = await request(app).post('/devlink/').send(devlink);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(devlink);
    });
    });

    context('when devlinkService.add is failed', () => {
      beforeEach(() => {
        devlinkService.add.mockRejectedValue('error');
      });
  
      it('returns status code of 500', async () => {
        const response = await request(app).post('/devlink/').send(devlink);

        expect(response.status).toBe(500);
        expect(response.text).toEqual('error');
        expect(response.body).toEqual({});
      });
    });
  });
});
