# Weather API

A minimal API to retrieve information of a city and its current weather data. This API is built with:

- Typescript
- MongoDB: Cities's information is persisted MongoDB
- Jest: testing framework
- [Mongoose](https://mongoosejs.com/): mongodb ODM.
- [tsoa](https://github.com/lukeautry/tsoa): to build OpenAPI-compliant REST API.
- [express](https://expressjs.com/): Node.js web framework
- [typedi](https://github.com/typestack/typedi): Dependency injection tool for typescript
- [msw](https://mswjs.io/): intercepts request on the network level for testing purpose.
- [axios](https://github.com/axios/axios): http client.
- [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server): a mongo server in memory for testing purpose.

## Project Structure

The project structure looks like this:

```sh
+-- src               # Most of the code lives in the `src` folder
+-- mocks             # Setup msw server to intercept 3rd party request at network level
+-- test              # Setup files for jest
```

Most of the codes live in `src/components` folder. Every `component` folder contains domain specific code for a given feature. A component could have the following structure:

```sh
src/components/some-component
|
+-- controllers       # A controller manages the incoming work HTTP requests
|
+-- services          # A service performs business logic
|
+-- models            # DB Model schemas, DTOs for the related component
|
+-- types             # Typescript type definition for the related component
|
+-- e2e               # end-to-end testing files
```

## Run the app

To run the server, you can choose one of the following way:

### Using docker-compose

- In docker-compose.yml, replace `<your-openweathermap-api-key>` by your real openweathermap api key
- Run docker-compose to start the server

### Using yarn command

- Make sure that `node 16.*` is installed. You can run `nvm use` to get the right node version if you're using nvm as the node manager
- Create a `.env` file in the root directory with the following content:

```
NODE_ENV=development
OPEN_WEATHER_API_KEY=<Openweathermap API key>
MONGO_DB_URI=mongodb://<hostname>:<port>/<database-name>
```

- Run `yarn add` to install dependencies
- Run `yarn start` to start the server or `yarn run start:dev` for live reloading

When the server starts at the first time, it can take few minutes because of the [seeding database script](https://github.com/kkhanhluu/weather-api/blob/main/src/utils/seedDb/index.ts).

## Call APIs

After getting the server running, all APIs are exposed under `http://localhost:4000`

## Documentation

API's documentation is served under `http://localhost:4000/docs`

## Testing

The tests are structured by `AAA pattern` (Arrange, Act and Assert). To run the tests you can choose one of the following ways:

### Using docker

- Run `docker build -t <your-tag> --target test .` to build the image and run the test suites
- If the image is already built, run `docker run <your-tag>` to run the test.

### Using yarn command

Run `yarn test` to run all tests
