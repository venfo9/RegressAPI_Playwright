# API Users Testing

This repository contains automated tests for the API users functionality. The tests are written using the Playwright test library.

## Files

### `api-users.spec.js`

This file contains all the test cases for the API users functionality. It utilizes the classes and modules from other files to perform various tests.

### `Users.js`

The `Users` class is responsible for interacting with the API related to user operations. It includes methods for retrieving, creating, updating, and deleting users. The class uses other modules for handling response headers, response status, and defining user schemas.

### `UserSchemas.js`

The `UserSchemas` module defines Joi schemas (also commented code for Ajv schemas) for validating user-related responses. It includes schemas for different API operations such as getting, creating, updating, and deleting users.

### `UserFields.js`

The `UserFields` module provides constants for user-related field names. This helps in maintaining consistency and avoiding hardcoding field names throughout the code.

### `CheckResponseHeaders.js`

The `CheckResponseHeaders` class includes static methods for validating response headers. It uses Playwright's `expect` function to assert the presence and format of specific headers.

### `CheckResponseStatus.js`

The `CheckResponseStatus` module provides methods for verifying the HTTP status of API responses. It includes checks for common status codes like OK, Created, and Not Found.

### `.env.local` and `.env.prod`

These files contain environment variables used in the tests. They can be configured to point to different API environments (local or production) and hold other necessary configurations.

## How to Run Tests

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Run the tests using `npx playwright test tests/api-users.spec.js`.

Feel free to customize and extend the tests as needed for your specific API.

## Dependecies
1. https://github.com/motdotla/dotenv
2. https://github.com/elaichenkov/odottaa?tab=readme-ov-file
3. https://github.com/hapijs/joi
4. https://github.com/ajv-validator (optional)
