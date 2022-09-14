import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedClass,
  mockedSecondTeacher,
  mockedSecondTeacherLogin,
  mockedTeacher,
  mockedTeacherLogin,
  mockedUpdateClass,
} from "../../mocks";

describe("/classes", () => {
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
    await request(app).post("/teachers").send(mockedSecondTeacher);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /classes -  Must be able to create a class", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .post("/classes")
      .send(mockedClass)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("isOpen");
    expect(response.body.isOpen).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /classes -  Should not be able to create a class with unauthorized token", async () => {
    const response = await request(app)
      .post("/classes")
      .send(mockedClass)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /classes -  Must be able to list all classes", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .get("/classes")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("hour");
    expect(response.body[0]).toHaveProperty("isOpen");
    expect(response.body[0]).toHaveProperty("teacher");
    expect(response.body[0].teacher).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });

  test("GET /classes -  Should not be able to list all classes with unauthorized token", async () => {
    const response = await request(app)
      .get("/classes")
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /classes/:idClass -  Must be able to list a class", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const classes = await request(app)
      .get("/classes")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app)
      .get("/classes/" + classes.body[0].id)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("isOpen");
    expect(response.body).toHaveProperty("teacher");
    expect(response.body.teacher).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });

  test("GET /classes/:idClass -  Should not be able to list a class with unauthorized token", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const classes = await request(app)
      .get("/classes")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app)
      .get("/classes/" + classes.body[0].id)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /classes/:idClass -  Should not be able to list a class that not exists", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .get("/classes/1")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /classes/:idClass -  Must be able to update a class", async () => {
    const teacherLoginResponse = await request(app)
      .post("/teachers/login")
      .send(mockedTeacherLogin);

    const classes = await request(app)
      .get("/classes")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app)
      .patch("/classes/" + classes.body[0].id)
      .send(mockedUpdateClass)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("isOpen");
    expect(response.body.isOpen).toEqual(false);
    expect(response.status).toBe(200);
  });

  test("PATCH /classes/:idClass -  Should not be able a teacher update a different class", async () => {
    const teacherLoginResponse = await request(app)
      .post("/classes/login")
      .send(mockedSecondTeacherLogin);

    const classes = await request(app)
      .get("/classes")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app)
      .patch("/classes/" + classes.body.id)
      .send(mockedUpdateClass)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /classes/:idClass -  Should not be able to update a class that not exists", async () => {
    const teacherLoginResponse = await request(app)
      .post("/classes/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .patch("/classes/1")
      .send(mockedUpdateClass)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /classes/:idClass -  Should not be able to update a class with unauthorized token", async () => {
    const teacherLoginResponse = await request(app)
      .post("/classes/login")
      .send(mockedTeacherLogin);

    const classes = await request(app)
      .get("/classes")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app)
      .patch("/classes/" + classes.body.id)
      .send(mockedUpdateClass)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /classes/:idClass -  Should not be able to delete a class with unauthorized token", async () => {
    const teacherLoginResponse = await request(app)
      .post("/classes/login")
      .send(mockedTeacherLogin);

    const classes = await request(app)
      .get("/classes")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app)
      .delete("/classes/" + classes.body.id)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /classes/:idClass -  Should not be able to delete a class that not exists", async () => {
    const teacherLoginResponse = await request(app)
      .post("/classes/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .delete("/classes/1")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /classes/:idClass -  Should not be able a teacher delete a different class", async () => {
    const teacherLoginResponse = await request(app)
      .post("/classes/login")
      .send(mockedSecondTeacherLogin);

    const classes = await request(app)
      .get("/classes")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app)
      .delete("/classes/" + classes.body.id)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
