import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedGuadian,
  mockedGuadianLogin,
  mockedSecondGuardian,
  mockedStudent,
  mockedThirdGuardian,
  mockedUpdateGuadian,
  mockedUpdateStudent,
} from "../../mocks";

describe("/guardians", () => {
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
    await request(app).post("/guardians").send(mockedSecondGuardian);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /guardians -  Must be able to create a guardian", async () => {
    const response = await request(app)
      .post("/guardians")
      .send(mockedThirdGuardian);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("cellNumber");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Pai3");
    expect(response.body.email).toEqual("pai3@kenzie.com");
    expect(response.status).toBe(201);
  });

  test("POST /guardians -  Should not be able to create a guardians that already exists", async () => {
    const response = await request(app)
      .post("/guardians")
      .send(mockedThirdGuardian);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /guardians -  Must be able to list all guardians", async () => {
    const response = await request(app).get("/guardians");

    expect(response.body).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });

  test("GET /guardians/:idGuardian -  Must be able to list a guardian and his students", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianLogin);

    const guardians = await request(app).get("/guardians");

    const response = await request(app)
      .get("/guardians/" + guardians.body[0].id)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });

  test("GET /guardians/:idGuardian -  Should not be able that other guardians list a different guardian", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianLogin);

    const guardians = await request(app).get("/guardians");

    const response = await request(app)
      .get("/guardians/" + guardians.body[2].id)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /guardians/:idGuardian -   Should not be able to list a guardian with unauthorized token", async () => {
    const guardians = await request(app).get("/guardians");

    const response = await request(app)
      .get("/guardians/" + guardians.body[0].id)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /guardians/:idGuardian -  Must be able to update a guardian", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianLogin);

    const guardians = await request(app).get("/guardians");

    const response = await request(app)
      .patch("/guardians/" + guardians.body[0].id)
      .send(mockedUpdateGuadian)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("cellNumber");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.cellNumber).toEqual("234567899");
    expect(response.status).toBe(200);
  });

  test("PATCH /guardians/:idGuardian -  Should not be able that other guardians update a different guardian", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianLogin);

    const guardians = await request(app).get("/guardians");

    const response = await request(app)
      .patch("/guardians/" + guardians.body[2].id)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /guardians/:idGuardian -  Should not be able to update a guardians that not exists", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianLogin);

    const response = await request(app)
      .patch("/guardians/1")
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /guardians/:idGuardian -  Should not be able to update a guardians with unauthorized token", async () => {
    const guardians = await request(app).get("/guardians");

    const response = await request(app)
      .patch("/guardians/" + guardians.body[0].id)
      .send(mockedGuadianLogin)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /guardians/:idGuardian -  Should not be able to delete a guardian with unauthorized token", async () => {
    const guardians = await request(app).get("/guardians");

    const response = await request(app)
      .delete("/guardians/" + guardians.body[2].id)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /guardians/:idGuardian -  Should not be able to delete a guardian that not exists", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianLogin);

    const response = await request(app)
      .delete("/guardians/1")
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /guardians/:idGuardian -  Should not be able that other guardians delete a different guardian", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianLogin);

    const guardians = await request(app).get("/guardians");

    const response = await request(app)
      .delete("/guardians/" + guardians.body[2].id)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /guardians/:idGuardian -  Must be able to delete a guardian", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedGuadianLogin);

    const guardians = await request(app).get("/guardians");

    const response = await request(app)
      .delete("/guardians/" + guardians.body[0].id)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("POST /guardians/students -  Must be able to create a students", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedSecondGuardian);

    const response = await request(app)
      .post("/guardians/students")
      .send(mockedStudent)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("FelipeJR");
    expect(response.body.email).toEqual("felipejr@kenzie.com");
    expect(response.status).toBe(201);
  });

  test("POST  /guardians/students -  Should not be able to create a students that already exists", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedSecondGuardian);

    const response = await request(app)
      .post("/guardians/students")
      .send(mockedStudent)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST  /guardians/students -  Should not be able to create a students with unauthorized token", async () => {
    const response = await request(app)
      .post("/guardians/students")
      .send(mockedStudent)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /students/:idStudent -  Must be able to update a student", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedSecondGuardian);

    const students = await request(app).get("/students");

    const response = await request(app)
      .patch("/students/" + students.body[0].id)
      .send(mockedUpdateStudent)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.age).toEqual(13);
    expect(response.status).toBe(200);
  });

  test("PATCH /students/:idStudent -  Should not be able that other guardians update a different student", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedThirdGuardian);

    const students = await request(app).get("/students");

    const response = await request(app)
      .patch("/students/" + students.body[0].id)
      .send(mockedUpdateStudent)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /students/:idStudent -  Should not be able to create a students with unauthorized token", async () => {
    const students = await request(app).get("/students");

    const response = await request(app)
      .patch("/students/" + students.body[0].id)
      .send(mockedUpdateStudent)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /students/:idStudent -  Should not be able to delete a student with unauthorized token", async () => {
    const students = await request(app).get("/students");

    const response = await request(app)
      .delete("/students/" + students.body[0].id)
      .set("Authorization", `Bearer`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /students/:idStudent -  Should not be able to delete a student that not exists", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedSecondGuardian);

    const response = await request(app)
      .delete("/students/1")
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /students/:idStudent -  Should not be able that other guardians delete a different student", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedThirdGuardian);

    const students = await request(app).get("/students");

    const response = await request(app)
      .delete("/students/" + students.body[0].id)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /students/:idStudent -  Must be able do delete a student", async () => {
    const guardianLoginResponse = await request(app)
      .post("/guardians/login")
      .send(mockedSecondGuardian);

    const students = await request(app).get("/students");

    const response = await request(app)
      .delete("/students/" + students.body[0].id)
      .set("Authorization", `Bearer ${guardianLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });
});
