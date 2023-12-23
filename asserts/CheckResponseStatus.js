// CheckResponseStatus.js
import { expect } from "@playwright/test";

exports.CheckResponseStatus = class CheckResponseStatus {
    static async okStatus(response) {
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
    }
    static async createStatus(response) {
        await expect(response).toHaveStatusCode(201);
        await expect(response).toHaveStatusText("Created");
    }
    static async deleteStatus(response) {
        await expect(response).toHaveStatusCode(204);
        await expect(response).toHaveStatusText("No Content");
    }
    static async notFoundStatus(response) {
        await expect(response).toHaveStatusCode(404)
        await expect(response).toHaveStatusText("Not Found")
    }
}

