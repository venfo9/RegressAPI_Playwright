// Tests
import {test, expect} from "@playwright/test";
import { Users } from "../objects/Users/Users";

// Constructing the endpoint URL for users based on environment variables
const endpointUsers = process.env.URL + process.env.apiVer + process.env.users;
// Creating an instance of the Users class with the constructed endpoint
const user = new Users(endpointUsers);

// Test to get information about an old user
test("get old user", async ({ request }) => {
    // Calling the getOldUser method with request object and user ID 3
    await user.getOldUser(request, 2);
});

// Test to create a new user
test("create new user", async ({ request }) => {
    // Calling the createNewUser method with request object and user details
    await user.createNewUser(request, "morpheus", "leader");
});

// Test to update information about a new user
test("update new user", async ({ request }) => {
    // Calling the updateNewUser method with request object and updated user details
    await user.updateNewUser(request, "morpheus_edited", "leader_edited");
});

// Test to delete information about a new user
test("delete new user", async ({ request }) => {
    // Calling the deleteNewUser method with the request object
    await user.deleteNewUser(request);
});

// Test to get information about a new user
test("get new user", async ({ request }) => {
    // Calling the getNewUser method with the request object
    await user.getNewUser(request);
});