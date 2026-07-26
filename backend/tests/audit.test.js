const request = require("supertest");
const app = require("../server");


describe("Page Pulse API Tests", () => {

    test("Should return error when URL is missing", async () => {

        const response = await request(app)
            .post("/api/audit")
            .send({});

        expect(response.statusCode).toBe(400);

        expect(response.body.error)
            .toBe("URL is required");

    });



    test("Should analyze valid website URL", async () => {

        const response = await request(app)
            .post("/api/audit")
            .send({
                url: "https://example.com"
            });


        expect(response.statusCode).toBe(200);

        expect(response.body)
            .toHaveProperty("title");

        expect(response.body)
            .toHaveProperty("wordCount");

    });



    test("Should handle invalid website", async () => {

        const response = await request(app)
            .post("/api/audit")
            .send({
                url: "https://invalidwebsite123456789.com"
            });


        expect(response.statusCode).toBe(500);

        expect(response.body.error)
            .toBe("Unable to fetch website");

    });


});