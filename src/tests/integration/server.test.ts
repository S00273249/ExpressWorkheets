import request from "supertest";
import { app } from "../../app";
import { connectDB } from "../../config/database/database";

beforeAll(async () => {
await connectDB();
});


describe("GET /ping", () => {
    it("should return hello from Dan", async () => {
        const response = await request(app)
            .get("/ping");

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            message: "hello from Dan"
        });
    });
});
