import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedGuadian,
  mockedGuadianInvalidLogin,
  mockedGuadianLogin,
  mockedStudent,
  mockedStudentInvalidLogin,
  mockedStudentLogin,
  mockedTeacher,
  mockedTeacherInvalidLogin,
  mockedTeacherLogin,
} from "../../mocks";

describe("/sessions", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/teachers").send(mockedTeacher);
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

  test("POST /guardians/login -  Must be able to login as a guardian", async () => {
    const response = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /guardians/login -  Should not be able to login as a guardian with invalid login", async () => {
    const response = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianInvalidLogin);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /students/login -  Must be able to login as a student", async () => {
    const response = await request(app)
      .post("/students/login")
      .send(mockedStudentLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /students/login -  Should not be able to login as a student with invalid login", async () => {
    const response = await request(app)
      .post("/students/login")
      .send(mockedStudentInvalidLogin);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /teachers/login -  Must be able to login as a teacher", async () => {
    const response = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /teachers/login -  Should not be able to login as a teacher with invalid login", async () => {
    const response = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherInvalidLogin);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});
