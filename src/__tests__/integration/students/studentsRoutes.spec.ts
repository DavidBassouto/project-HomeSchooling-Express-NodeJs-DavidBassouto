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

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /students/me -  Must be able to list a student", async () => {
    const studentLoginResponse = await request(app)
      .post("/students/login")
      .send(mockedStudentLogin);

    const response = await request(app)
      .get("/students/me")
      .set("Authorization", `Bearer ${studentLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("students");
    expect(response.body.students).toHaveProperty("id");
    expect(response.body.students).toHaveProperty("name");
    expect(response.body.students).toHaveProperty("email");
    expect(response.body.students).toHaveProperty("age");
    expect(response.body.students).toHaveProperty("createdAt");
    expect(response.body.students).toHaveProperty("updatedAt");
    expect(response.body.students).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });
});
