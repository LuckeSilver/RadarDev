const { Router } = require("express");
const axios = require("axios");
const routes = Router();
const Dev = require("./models/Dev");

routes.post("/devs", async (request, response) => {
  const { github_username, techs } = request.body;

  const apiResponse = await axios.get(
    `https://api.github.com/users/${github_username}`
  );

  const { name = login, avatar_url, bio } = apiResponse.data;

  const techsArray = techs.split(",").map(tech => tech.trim());

  await Dev.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArray
  });

  return response.json({ message: "Hello Omnistack" });
});

module.exports = routes;
