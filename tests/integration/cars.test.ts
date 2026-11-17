import request from "supertest";
import { app } from "../../src/app";

let accessToken: string;
let carId: string;

beforeAll(async () => {
    const loginResponse = await request(app)
        .post("/api/v1/auth/login")
        .send({
            email: "daniel.test@example.com",
            password: "password123"
        });

    expect(loginResponse.status).toBe(200);
    accessToken = loginResponse.body.token;

    const carResponse = await request(app)
        .post("/api/v1/cars")
        .set('x-api-key', 'test-api-key')
        .send({
            make: "Toyota",
            model: "Corolla",
            year: 2020
        });

    expect(carResponse.status).toBe(201);
    carId = carResponse.body._id;
}, 15000);

describe('DELETE /cars/:id', () => {

    it('returns 401 without a JWT', async () => {
        const response = await request(app)
            .delete(`/api/v1/cars/${carId}`)
            .set('x-api-key', 'test-api-key');

        expect(response.status).toBe(401);
    });

    it('deletes a car with a valid JWT and API key', async () => {
        const response = await request(app)
            .delete(`/api/v1/cars/${carId}`)
            .set('x-api-key', 'test-api-key')
            .set('Authorization', `Bearer ${accessToken}`);

        expect(response.status).toBe(200);

    });

});
