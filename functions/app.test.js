import request from 'supertest';

import app from './app';

describe('app', () => {
  context('with path /hello-world', () => {
    it('responses hello world', async () => {
      const { ok, status, body, text } = await request(app).get('/hello-world');
      expect(ok).toBe(true);
      expect(status).toBe(200);
      expect(body).toBeDefined();
      expect(text).toBe('Hello World!!');
    });
  });
});
