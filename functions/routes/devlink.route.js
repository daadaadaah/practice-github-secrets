const express = require('express');

const devlinkService = require('../services/devlink.service');

const router = express.Router();

router.get("/all", async (request, response) =>  {

  try {
    
    const devlinks= await devlinkService.getAll();

    return response.status(201).json(devlinks);

  } catch (error) {
      return response.status(500).send(error);  
  }
  
});

router.post("/", async (request, response) =>  {

  try {

    const newDevlink = {
      url: request.body.url,
      writtenAt: request.body.writtenAt,
      keyword: request.body.keyword,
      tags: request.body.tags,
      reviews: request.body.reviews,
      createdAt: request.body.createdAt, // 현재 시간
      updatedAt: request.body.updatedAt, // null
      deletedAt: request.body.deletedAt, // null
    }

    const devlink = await devlinkService.add(newDevlink);

    return response.status(201).json(devlink);

  } catch (error) {
      return response.status(500).send(error);  
  }
  
});

module.exports = router;