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
  mockedSecondTeacher,
  mockedSecondTeacherLogin,
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

    await request(app).post("/teachers").send(mockedSecondTeacher);
    const loginTeacherResponse = await request(app)
      .post("/teachers/login")
      .send(mockedSecondTeacherLogin);
    await request(app)
      .post("/classes")
      .send({ name: "Classe A", hour: "9:00" })
      .set("Authorization", `Bearer ${loginTeacherResponse.body.token}`);
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
      .send(mockedSecondTeacherLogin);

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
    expect(response.status).toBe(401);
  });

  test("PATCH /teachers/:idTeacher -  Should not be able to update a teacher with unauthorized token", async () => {
    const teachers = await request(app).get("/teachers");

    const response = await request(app)
      .patch("/teachers/" + teachers.body[0].id)
      .send(mockedUpdateTeacher)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
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
    expect(response.status).toBe(401);
  });

  test("DELETE /teachers/:idTeacher -  Must be able to delete a teacher", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const teachers = await request(app).get("/teachers");

    const response = await request(app)
      .delete("/teachers/" + teachers.body[1].id)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("GET /teachers/:idTeacher -  Must be able to list a teacher", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedSecondTeacherLogin);
    const teachers = await request(app).get("/teachers");

    const response = await request(app)
      .get("/teachers/" + teachers.body[0].id)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });

  test("GET /teachers/:idTeacher -  Should not be able to list a teacher that not exists", async () => {
    const response = await request(app).get("/teachers/1");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /teachers/:idClass -  Must be able to add a student", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedSecondTeacherLogin);

    const classes = await request(app)
      .get("/classes")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app)
      .post("/teachers/" + classes.body[0].id)
      .send(mockedStudent.email)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("email");
    expect(response.body[0]).toHaveProperty("age");
    expect(response.body[0]).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });

  test("POST /teachers/:idClass -  Should not be able to add a student that not exists", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);
    const response = await request(app)
      .post("/teachers/1")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /teachers/:idClass-  Should not be able to add same student in a class", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedSecondTeacherLogin);

    const classes = await request(app)
      .get("/classes")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app)
      .post("/teachers/" + classes.body[0].id)
      .send({ email: mockedStudent.email })
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /teachers/:idStudent -  Should not be able to add a inactive student in a class", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianLogin);

    const students = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    await request(app)
      .delete("/students/" + students.body[1].id)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    const response = await request(app)
      .post("/teachers/" + students.body[1].id)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /teachers/:idClass -  Should not be able to add a students with unauthorized token", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedSecondTeacherLogin);

    const classes = await request(app)
      .get("/classes")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app)
      .post("/teachers/" + classes.body[0].id)
      .send(mockedStudent.email)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
