const request = require("supertest");

const server = require("./server");
const db = require("../data/dbConfig");

describe("server", () => {
	describe("GET /", () => {
		it("should return 200 OK", () => {
			return request(server)
				.get("/")
				.then((res) => {
					expect(res.status).toBe(200);
				});
		});

		it("should return object", () => {
			return request(server)
				.get("/")
				.then((res) => {
					expect(res.body).toEqual({ api: "running" });
				});
		});
	});

	describe("GET /api/friends", () => {
		it("should return empty array", async () => {
			await db("friends").truncate();

			return request(server)
				.get("/api/friends")
				.then((res) => {
					expect(res.body).toHaveLength(0);
				});
		});

		it("should return array of length of 1", async () => {
			await db("friends").insert({
				name: "Jim",
				birthday: "01-01-01",
			});

			return request(server)
				.get("/api/friends")
				.then((res) => {
					expect(res.body).toHaveLength(1);
				});
		});
	});

	describe("POST /api/friends", () => {
		it("should return 401 if missing friend property", () => {
			return request(server)
				.post("/api/friends")
				.send({ name: "Jim" })
				.then((res) => {
					expect(res.status).toBe(401);
				});
		});

		it("should return friend", async () => {
			await db("friends").truncate();

			return request(server)
				.post("/api/friends")
				.send({ name: "Jim", birthday: "01-01-01" })
				.then((res) => {
					expect(res.body).toEqual({
						id: 1,
						name: "Jim",
						birthday: "01-01-01",
					});
				});
		});
	});

	describe("DELETE /api/friends", () => {
		beforeEach(async () => {
			await db("friends").truncate();
			await db("friends").insert({
				name: "Jim",
				birthday: "01-01-01",
			});
		});

		it("should delete friend", async () => {
			return request(server)
				.delete("/api/friends/1")
				.then(async () => {
					await db("friends").then((friends) => {
						expect(friends).toHaveLength(0);
					});
				});
		});

		it("should return deleted friend", () => {
			return request(server)
				.delete("/api/friends/1")
				.then((res) => {
					expect(res.body).toEqual({
						id: 1,
						name: "Jim",
						birthday: "01-01-01",
					});
				});
		});
	});
});
