# 🌠 Icarus 🌠

## Find your favourite asteroids

This web application takes leverage of the NASA NeoWs (Near Earth Object Web Service), a RESTful web service for near earth Asteroid information.

## Stack

- The backend server has been written in Node.js (v22.11.0) + Express (v4.21.1);
- The frontend application has been written using React (v18.3.1), with Vite as a building tool, and Axios as a helper service to handle the API calls to the backend server. In the containerized version, a Nginx image has been used to serve the React application.

Both projects have been written using TypeScript.

## Installation

### Containerized version

For ease of use, this application has been containerized using Docker Compose (Docker v27.3.1). In order to use it, please follow these steps:

1. Clone this repository:

```txt
git clone https://github.com/devluxor/icarus.git
```

2. Then, in the `backend` folder of the root directory, create a file `.env` with the following content:

```txt
PORT=8080
ASTEROID_API_URL=https://api.nasa.gov/neo/rest/v1/feed
ASTEROID_DETAILS_API_URL=https://api.nasa.gov/neo/rest/v1/neo
API_KEY=<API KEY>
```

Note that the API KEY must be either `DEMO_KEY` (it won't allow for multiple successive requests, as it works just for demo purposes) or **an official NASA API key**, which can be easily obtainable by completing this [form](https://api.nasa.gov/#signUp).

3. Once this file is created in the `backend` folder, please run the following command:

```sh
docker compose up
```

This will run both containers at the same time, orchestrating the backend and the frontend elements of the application to run together. You will be able to access the UI via the URL <http://localhost:3030>.
I opted to expose the backend server API as well in order for the user to query the API directly (i.e.: using Postman), and to check the server won't accept bad user input (for instance, incoherent or invalid dates in the query parameters). The user can access the backend server via the URL <http://localhost:8080>.

In other circumstances, I would have used a reverse proxy as a third element in the containers' orchestration, and I would only have this proxy's port exposed to the public for greater security. Note the `.env` file, although it does not contain important secrets, is not copied to the images, as the environment variables are passed directly, on runtime, when the image is created and run.

## Pending tasks; todos.

The most important aspects that are pending to do are: 

- Tests
- API pagination
- More sorting functionality
- More processing work of the asteroids for a fuller picture of the asteroid characteristics and astronomical history, as well as improve the performance of the application.
- Further Docker Image building optimization

With limited time, and limited requests with a single key to the NASA API, I had to prioritize between having adding more features and implement complete unit, integration and E2E tests. I chose the former, as in a short time, in a project of these characteristics, my opinion is that is worth risking the sacrifice of code coverage for a more enjoyable experience, specially with the help of the type safety that TypeScript provides. With more time on my, no doubt I wouldn't hesitate on implementing a full testing suite.
