const express = require('express');

const router = express.Router();

router.get("/", async (request, response) => {
  return response.status(200).send('Hello World!!');
});

module.exports = router;
