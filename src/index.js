const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

function checksRepository(request, response, next) {
  const { id } = request.params;

  const repository = repositories.find((repository) => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found!" });
  }

  request.repository = repository;

  return next();
}

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", checksRepository, (request, response) => {
  const { title, url, techs } = request.body;
  const { repository } = request;
  // const updatedRepository = request.body;

  // repositoryIndex = repositories.findindex(repository => repository.id === id);

  // if (repositoryIndex < 0) {
  //   return response.status(404).json({ error: "Repository not found" });
  // }

  // const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  // repositories[repositoryIndex] = repository;

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", checksRepository, (request, response) => {
  const { repository } = request;

  repositoryIndex = repositories.indexOf(repository);

  repositories.splice(repositoryIndex, 1);

  return response.sendStatus(204);
});

app.post("/repositories/:id/like", checksRepository, (request, response) => {
  const { repository } = request;

  repositoryIndex = repositories.indexOf(repository);

  const likes = ++repositories[repositoryIndex].likes;
  repository.likes = likes;

  return response.json(repository);
});

module.exports = app;
