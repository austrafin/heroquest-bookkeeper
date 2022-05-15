# HeroQuest Bookkeeper

This program is for keeping note of heroes' stats in a game called HeroQuest (https://en.wikipedia.org/wiki/HeroQuest).

## Development

The easiest way to set up the development environment is to run it on Docker by running command ```docker compose up``` in the root directory. The default URL for the frontend is http://localhost:3000 and for the backend http://localhost:5000. Before this, however the .env files should be created for both, the frontend and the backend. This can be done by copying the values from .env.example.

## API

### Documentation

The API documentation can be found from <BASE_URL>/api-docs ie. http://localhost:5000/api-docs.

### Postman collection

There is a convinient set of all API calls in backend/HeroQuest bookkeeper.postman_collection which can be imported to Postman.

## Tests

Currently there are only tests for the frontend. These can be run with command ```npm test``` in the frontend directory.