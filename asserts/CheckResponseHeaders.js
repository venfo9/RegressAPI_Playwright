// CheckResponseHeaders.js
import { expect } from "@playwright/test";
//uncomment to validate header from a JSON file
//import expectedHeaders from "../headers-asserts/get_user_headers.json";

exports.CheckResponseHeaders = class CheckResponseHeaders {
    // Static method to check the 'Content-Type' header in the response
    static async checkContentTypeHeader(response) {
        // Using Playwright's 'expect' to validate the 'Content-Type' header
        await expect(response).toHaveHeader('content-type', 'application/json; charset=utf-8');
        // Uncomment the line below to validate header from a JSON file
        //await expect(response).toHaveHeaders(expectedHeaders);
    }

    // Static method to check the 'Date' header in the response
    static async checkDateHeader(response) {
        // Using Playwright's 'expect' to validate the 'Date' header
        await expect(response).toHaveHeader('date');

        // Additional check for the 'date' format
        // Extracting the 'date' header value from the response
        const dateHeaderValue = response.headers()['date'];
        // Regular expression for the expected 'date' format
        const dateRegex = /^\w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/;
        // Validating that the 'date' header value matches the expected format
        expect(dateHeaderValue).toMatch(dateRegex);
    }
};