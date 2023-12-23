// UserSchemas.js
import Joi from "joi";
import {expect} from "@playwright/test";
//const createJoiSchema = (schema) => Joi.object(schema).prefs({ convert: false });

exports.UserSchemas = class UserSchemas {

    // Joi schemas
    getSchema() {
        return Joi.object({
            data: Joi.object({
                id: Joi.number().required(),
                email: Joi.string().email().required(),
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                avatar: Joi.string().uri().required()
            }),
            support: Joi.object({
                url: Joi.string().uri().required(),
                text: Joi.string().required()
            })
        }).prefs({ convert: false });
    }

    postSchema(name, job) {
        return Joi.object({
            name: Joi.string().valid(name).required(),
            job: Joi.string().valid(job).required(),
            id: Joi.required(), // change to Joi.number().required(), but u will get a bug from regress api cause id returns as string
            createdAt: Joi.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/).required(),
        }).prefs({ convert: false });
    }
    putSchema(name, job) {
        return Joi.object({
            name: Joi.string().valid(name).required(),
            job: Joi.string().valid(job).required(),
            updatedAt: Joi.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/).required(),
        }).prefs({ convert: false });
    }

    //Checkers of empty body

    async emptyResponse(response) {
        const responseBody = await response.text();
        expect(responseBody).toBe('');
    }

    async emptyObjectResponse(response){
        const responseBody = await response.text()
        expect(responseBody).toBe('{}')
    }


    // AJV schemas

    getSchemaAJV(){
        return {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        email: { type: 'string', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' },
                        first_name: { type: 'string' },
                        last_name: { type: 'string' },
                        avatar: { type: 'string', pattern: '^https:\\/\\/[^\\s\"\\n\\r\\t\\f\\v]+$' },
                    },
                    required: ['id', 'email', 'first_name', 'last_name', 'avatar'],
                    additionalProperties: false,
                },
                support: {
                    type: 'object',
                    properties: {
                        url: { type: 'string', pattern: '^https:\\/\\/[^\\s\"\\n\\r\\t\\f\\v]+$' },
                        text: { type: 'string' },
                    },
                    required: ['url', 'text'],
                    additionalProperties: false,
                },
            },
            required: ['data', 'support'],
            additionalProperties: false,
        };
    }

    postSchemaAJV(name, job){
        return {
            type: 'object',
            properties: {
                name: { type: 'string', enum: [name] },
                job: { type: 'string', enum: [job] },
                id: { }, // add "type: 'number'", but u will get a bug from regress api cause id returns as string
                createdAt: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z$' },
            },
            required: ['name', 'job', 'id', 'createdAt'],
            additionalProperties: false,
        };
    }
    putSchemaAJV(name, job){
        return {
            type: 'object',
            properties: {
                name: { type: 'string', enum: [name] },
                job: { type: 'string', enum: [job] },
                updatedAt: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z$' },
            },
            required: ['name', 'job', 'updatedAt'],
            additionalProperties: false,
        };
    }


}

