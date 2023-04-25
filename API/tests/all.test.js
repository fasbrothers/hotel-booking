const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO);
});

/* Dropping the database and closing connection after each test. */
afterEach(async () => {
  // await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

/* Testing the API endpoints. */
// get all hotels
describe("GET /api/hotels", () => {
  it("should return all hotels", async () => {
    const res = await request(app).get("/api/hotels");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// get hotel by id
describe("GET /api/hotels/find/:id", () => {
  it("should return a hotel", async () => {
    const res = await request(app).get(
      "/api/hotels/find/6331abc9e9ececcc2d449e44"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Hilton");
  });
});

// create hotel
describe("POST /api/hotels", () => {
  it("should create a hotel", async () => {
    const res = await request(app).post("/api/hotels").send({
      name: "Hampton Inn",
      address: "123 Main St",
      distance: "100m",
      city: "TASHKENT",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Hampton Inn");
  });
});

// create hotel with empty name
describe("POST /api/hotels", () => {
  it("should create a hotel", async () => {
    const res = await request(app).post("/api/hotels").send({
      name: "",
    });
    expect(res.statusCode).toBe(500);
  });
});

describe("PUT /api/hotels/:id", () => {
  it("should update a hotel", async () => {
    const res = await request(app)
      .patch("/api/hotels/6331abc9e9e34242c2d449e44")
      .send({
        name: "Hilton",
        city: "BUKHARA",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Hilton");
  });
});

describe("DELETE /api/hotels/:id", () => {
  it("should delete a hotel", async () => {
    const res = await request(app).delete(
      "/api/hotels/6331abc9e9423422d449e44"
    );
    expect(res.statusCode).toBe(200);
  });
});

// get all users
describe("GET /api/users", () => {
  it("should return all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// get user by id
describe("GET /api/users/:id", () => {
  it("should return a user", async () => {
    const res = await request(app).get("/api/users/6331abc9e9ececcc2d449e44");
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe("Sn");
  });
});

// create user
describe("POST /api/users", () => {
  it("should create a user", async () => {
    const res = await request(app).post("/api/users").send({
      username: "",
    });
    expect(res.statusCode).toBe(500);
  });
});

// create user with empty username
describe("POST /api/users", () => {
  it("should create a user", async () => {
    const res = await request(app).post("/api/users").send({
      username: "Ann",
      email: "ann@gmail.com",
      city: "TASHKENT",
      password: "123456",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe("Ann");
  });
});

describe("PUT /api/users/:id", () => {
  it("should update a user", async () => {
    const res = await request(app)
      .patch("/api/users/6331abc9e9ececcc2d449e44")
      .send({
        username: "Banng",
        city: "BUKHARA",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe("Banng");
  });
});

describe("DELETE /api/users/:id", () => {
  it("should delete a user", async () => {
    const res = await request(app).delete(
      "/api/hotels/6331abc9e9ececcc2d449e44"
    );
    expect(res.statusCode).toBe(200);
  });
});

// get all rooms
describe("GET /api/rooms", () => {
  it("should return all rooms", async () => {
    const res = await request(app).get("/api/rooms");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// get room by id
describe("GET /api/rooms/:id", () => {
  it("should return a room", async () => {
    const res = await request(app).get("/api/rooms/6331bbb9e9ececcc2d449e44");
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Penthouse");
  });
});

// create room
describe("POST /api/rooms/6331bbb9e9ececcc2d449323", () => {
  it("should create a room", async () => {
    const res = await request(app)
      .post("/api/rooms/633bbb9e9ececcc2d449323")
      .send({
        title: "Big Room",
        price: "100",
        maxPeople: "2",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Big Room");
  });
});

// create room with empty title
describe("POST /api/rooms/6331bbb9e9ececcc2d449323", () => {
  it("should create a room", async () => {
    const res = await request(app)
      .post("/api/rooms/633bbb9e9ececcc2d449323")
      .send({
        title: "",
      });
    expect(res.statusCode).toBe(500);
  });
});

describe("PUT /api/rooms/:id", () => {
  it("should update a room", async () => {
    const res = await request(app)
      .patch("/api/rooms/6331abc9e9ececcc2d449e44")
      .send({
        title: "Small Room",
        maxPeople: "1",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.maxPeople).toBe("1");
  });
});
