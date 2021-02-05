# Webhook

Small webhook server, which allows API clients to register a URL that will receive an HTTP request in response to certain events.

## Instalation

Clone repository and run

```bash
npm i
```

## Usage

Start server

```bash
nodemon
```

OR

```bash
npm run start
```

Application controls from script.js by running

```node
node script.js
```

Script.js simulates clients' trigger. Data sets in script.js can be altered/added/removed.
Alternatively APIs can be called/tested in Postman with a body equal to data objects from script.js.

## Tests

Tests are wriiten with the help of Jest and located in a test folder: `webhook.test.js` . Tests run by

```bash
npm run test
```

## Source code

### server.js

Implementation of HTTP server.

### routes.js

Defines two POST routes - first to register webhook and second to post data to that webhook.

### functions.js

Contains business logic, tested by test file.
