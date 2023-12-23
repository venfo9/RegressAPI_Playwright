//Users.js
import { UserFields } from "./UserFields";
import { CheckResponseHeaders } from "../../asserts/CheckResponseHeaders";
import { CheckResponseStatus } from "../../asserts/CheckResponseStatus";
import { UserSchemas } from "./UserSchemas";

import Joi from "joi";

//uncomment the following lines if you want to use ajv library instead of Joi to validate JSON schemas
//const Ajv = require('ajv');
//const ajv = new Ajv({ allErrors: true });

//uncomment the following line if you want to compare the get response of the second user with the expected one in this file
//const expectedResponse = require('../../asserts/get_user2_response.json')

exports.Users = class Users {
    // Constructor to initialize class properties
    constructor(endpointUsers) {
        // Setting the endpoint URL for users
        this.endpointUsers = endpointUsers;
        // Initializing userId property to null
        this.userId = null;
        // Creating an instance of UserFields class
        this.userFields = new UserFields();
        // Creating an instance of UserSchemas class
        this.userSchemas = new UserSchemas();
    }

    // Method to get information about an old user
    async getOldUser(request, userId) {
        // Sending a GET request to the specified user endpoint
        const response = await request.get(this.endpointUsers + userId);

        // Checking response headers for content type and date
        await CheckResponseHeaders.checkContentTypeHeader(response);
        await CheckResponseHeaders.checkDateHeader(response);
        // Verifying the response status is OK
        await CheckResponseStatus.okStatus(response);

        // Validating the response body against the getSchema
        Joi.assert(await response.json(), this.userSchemas.getSchema());

        //uncomment the following line if you want to compare response of the second user with the expected JSON body
        //await expect(response).toHaveJSON(expectedResponse)

        //Uncomment to use ajv library instead of Joi to validate JSON schemas
        // const validate = ajv.compile(this.userSchemas.getSchemaAJV());
        //
        // if (validate(await response.json())) {
        //     console.log('Validation passed');
        //     // Continue with your logic
        // } else {
        //     console.error('Validation error:', validate.errors);
        //     // Handle validation errors
        //     throw new Error('Validation failed');
        // }
    }

    // Method to create a new user
    async createNewUser(request, name, job) {
        // Sending a POST request to the user endpoint with user data
        const response = await request.post(this.endpointUsers, {
            data: {
                [this.userFields.name]: name,
                [this.userFields.job]: job
            }
        });

        // Logging the userId before and after the request
        console.log('userid before:', this.userId);
        this.userId = (await response.json()).id;
        console.log('userid after:', this.userId);
        console.log(await response.text());

        // Checking response headers for content type and date
        await CheckResponseHeaders.checkContentTypeHeader(response);
        await CheckResponseHeaders.checkDateHeader(response);
        // Verifying the response status is Created
        await CheckResponseStatus.createStatus(response);

        // Validating the response body against the postSchema
        Joi.assert(await response.json(), this.userSchemas.postSchema(name, job));

        //Uncomment to use ajv library instead of Joi to validate JSON schemas
        // const validate = ajv.compile(this.userSchemas.postSchemaAJV(name, job));
        //
        // if (validate(await response.json())) {
        //     console.log('Validation passed');
        //     // Continue with your logic
        // } else {
        //     console.error('Validation error:', validate.errors);
        //     // Handle validation errors
        //     throw new Error('Validation failed');
        // }

    }

    // Method to update information about a new user
    async updateNewUser(request, name, job) {
        // Sending a PUT request to the specified user endpoint with updated data
        const response = await request.put(this.endpointUsers + this.userId, {
            data: {
                [this.userFields.name]: name,
                [this.userFields.job]: job
            }
        });

        // Logging the update information and response text
        console.log('update new user:', this.endpointUsers + this.userId);
        console.log(await response.text());

        // Checking response headers for content type and date
        await CheckResponseHeaders.checkContentTypeHeader(response);
        await CheckResponseHeaders.checkDateHeader(response);
        // Verifying the response status is OK
        await CheckResponseStatus.okStatus(response);

        // Validating the response body against the putSchema
        Joi.assert(await response.json(), this.userSchemas.putSchema(name, job));

        //Uncomment to use ajv library instead of Joi to validate JSON schemas
        // const validate = ajv.compile(this.userSchemas.putSchemaAJV(name, job));
        //
        // if (validate(await response.json())) {
        //     console.log('Validation passed');
        //     // Continue with your logic
        // } else {
        //     console.error('Validation error:', validate.errors);
        //     // Handle validation errors
        //     throw new Error('Validation failed');
        // }

    }

    // Method to delete information about a new user
    async deleteNewUser(request) {
        // Sending a DELETE request to the specified user endpoint
        const response = await request.delete(this.endpointUsers + this.userId);
        // Logging the delete information and response text
        console.log('delete new user:', this.endpointUsers + this.userId);
        console.log(await response.text());

        // Checking response headers for date
        await CheckResponseHeaders.checkDateHeader(response);
        // Verifying the response status is No Content
        await CheckResponseStatus.deleteStatus(response);

        // Validating the empty response body
        await this.userSchemas.emptyResponse(response);
    }

    // Method to get information about a new user
    async getNewUser(request) {
        // Sending a GET request to the specified user endpoint
        const response = await request.get(this.endpointUsers + this.userId);
        // Logging the get information and response text
        console.log('get new user:', this.endpointUsers + this.userId);
        console.log(await response.text());

        // Checking response headers for content type, date, and status
        await CheckResponseHeaders.checkContentTypeHeader(response);
        await CheckResponseHeaders.checkDateHeader(response);
        await CheckResponseStatus.notFoundStatus(response);

        // Validating the empty object response body
        await this.userSchemas.emptyObjectResponse(response);
    }
};
