import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedTeacher } from "../../mocks";

describe("/teacher", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /teacher -  Must be able to create a teacher", async () => {
    const response = await request(app).post("/teacher").send(mockedTeacher);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("bio");
    expect(response.body).toHaveProperty("subject");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Felipe");
    expect(response.body.email).toEqual("felipe@kenzie.com");
    expect(response.status).toBe(201);
  });

  test("POST /teacher -  should not be able to create a teacher that already exists", async () => {
    const response = await request(app).post("/teacher").send(mockedTeacher);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });
});
