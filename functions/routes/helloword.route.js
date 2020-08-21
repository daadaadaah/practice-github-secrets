import express from 'express';

const router = express.Router();

router.get("/", async (request, response) => {
  return response.status(200).send('Hello World!!');
});

export default router;
