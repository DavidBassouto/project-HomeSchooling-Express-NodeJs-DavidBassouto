import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedTeacher,
  mockedStudent,
  mockedSecondStudent,
  mockedTeacherLogin,
  mockedGuadian,
  mockedGuadianLogin,
  mockedUpdateTeacher,
} from "../../mocks";

describe("/teachers", () => {
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
    await request(app)
      .post("/guardians/students")
      .send(mockedSecondStudent)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /teachers -  Must be able to create a teacher", async () => {
    const response = await request(app).post("/teachers").send(mockedTeacher);

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

  test("POST /teachers -  Should not be able to create a teacher that already exists", async () => {
    const response = await request(app).post("/teachers").send(mockedTeacher);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /teachers -  Must be able to list all teachers", async () => {
    const response = await request(app).get("/teachers");

    expect(response.body).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });

  test("PATCH /teachers/:idTeacher -  Must be able to update a teacher", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const teachers = await request(app).get("/teachers");

    const response = await request(app)
      .patch("/teachers/" + teachers.body[0].id)
      .send(mockedUpdateTeacher)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("bio");
    expect(response.body).toHaveProperty("subject");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.subject).toEqual("React JS");
    expect(response.status).toBe(200);
  });

  test("PATCH /teachers/:idTeacher -  Should not be able to update a teacher that not exists", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .patch("/teachers/1")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /teachers/:idTeacher -  Should not be able to update a teacher with unauthorized token", async () => {
    const teachers = await request(app).get("/teachers");

    const response = await request(app)
      .patch("/teachers/" + teachers.body[0].id)
      .send(mockedUpdateTeacher)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("DELETE /teachers/:idTeacher -  Should not be able to delete a teacher with unauthorized token", async () => {
    const teachers = await request(app).get("/teachers");

    const response = await request(app)
      .delete("/teachers/" + teachers.body[0].id)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /teachers/:idTeacher -  Should not be able to delete a teacher that not exists", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .delete("/teachers/1")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /teachers/:idTeacher -  Must be able to delete a teacher", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const teachers = await request(app).get("/teachers");

    const response = await request(app)
      .delete("/teachers/" + teachers.body[0].id)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("DELETE /teachers/:idTeacher -  Should not be able to delete a teacher that isActive = false", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const teachers = await request(app).get("/teachers");

    const response = await request(app)
      .delete("/teachers/" + teachers.body[0].id)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("GET /teachers/:idTeacher -  Must be able to list a teacher and his classes", async () => {
    const teachers = await request(app).get("/teachers");

    const response = await request(app).get("/teachers/" + teachers.body[0].id);

    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("classes");
    expect(response.body).toHaveProperty("teacher");
    expect(response.status).toBe(200);
  });

  test("GET /teachers/:idTeacher -  Should not be able to list a teacher that not exists", async () => {
    const response = await request(app).get("/teachers/1");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /teachers/:idStudent -  Must be able to add a student", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const students = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);
    const studentId = students.body[0].id;

    const response = await request(app)
      .post("/teachers/" + studentId)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("age");
    expect(response.body).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });

  test("POST /teachers/:idStudent -  Should not be able to add a student that not exists", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);
    const response = await request(app)
      .post("/teachers/1")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /teachers/:idStudent -  Should not be able to add same student in a class", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);
    const students = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);
    const studentId = students.body[0].id;

    const response = await request(app)
      .post("/teachers/" + studentId)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /teachers/:idStudent -  Should not be able to add a inactive student in a class", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);
    const students = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);
    const studentId = students.body[1].id;

    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianLogin);

    await request(app)
      .delete("/guardians/students/" + studentId)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    const response = await request(app)
      .post("/teachers/" + studentId)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /teachers/:idStudent -  Should not be able to add a students with unauthorized token", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);
    const students = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);
    const studentId = students.body[1].id;

    const response = await request(app)
      .post("/teachers/" + studentId)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });
});
