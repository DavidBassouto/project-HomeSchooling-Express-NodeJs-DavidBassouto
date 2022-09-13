import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedGuadian,
  mockedGuadianLogin,
  mockedStudent,
  mockedStudentLogin,
} from "../../mocks";

describe("/students", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/guardians").send(mockedGuadian);
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianLogin);
    await request(app)
      .post("/guardians/students")
      .send(mockedStudent)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("GET /students -  Must be able to list all students", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianLogin);

    const response = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("students");
    expect(response.body.students).toHaveLength(1);
    expect(response.status).toBe(201);
  });

  test("GET /students -  Should not be able to list all students with unauthorized token", async () => {
    const response = await request(app)
      .get("/students")
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /students/me -  Must be able to list a student", async () => {
    const studentLoginResponse = await request(app)
      .post("/students/login")
      .send(mockedStudentLogin);

    const response = await request(app)
      .get("/students/me")
      .set("Authorization", `Bearer ${studentLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });

  test("GET /students/me -  Should not be able to list a student with unauthorized token", async () => {
    const response = await request(app)
      .get("/students/me")
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
