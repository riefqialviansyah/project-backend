const { expect, it } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { SendMeMail } = require("../models");

beforeAll(() => {});
afterAll(() => {
  SendMeMail.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Portfolio Send Me Mail", () => {
  it("can send me mail", async () => {
    const data = {
      name: "Riefqi Alviansyah",
      email: "riefqialviansyahdevelopment@gmail.com",
      message: "Hello World",
    };

    const response = await request(app)
      .post("/portfolio/send-me-mail")
      .send(data);

    expect(response.body).toEqual({ message: "Success send email" });
  });

  it("error if mail not valid", async () => {
    const data = {
      name: "Riefqi",
      email: "riefqialviansyahdevelopmentgmail.com",
      message: "Hello World",
    };

    const response = await request(app)
      .post("/portfolio/send-me-mail")
      .send(data);

    expect(response.body).toEqual({
      message: "Not valid email",
    });
  });

  it("will error if name is empty", async () => {
    const data = {
      name: "",
      email: "riefqialviansyahdevelopment@gmail.com",
      message: "Hello World",
    };

    const response = await request(app)
      .post("/portfolio/send-me-mail")
      .send(data);

    expect(response.body).toEqual({ message: "Name is required" });
  });

  it("will error if email is empty", async () => {
    const data = {
      name: "Riefqi Alviansyah",
      email: "",
      message: "Hello World",
    };

    const response = await request(app)
      .post("/portfolio/send-me-mail")
      .send(data);

    expect(response.body).toEqual({ message: "Email is required" });
  });

  it("will error if message is empty", async () => {
    const data = {
      name: "Riefqi",
      email: "riefqialviansyahdevelopment@gmail.com",
      message: "",
    };

    const response = await request(app)
      .post("/portfolio/send-me-mail")
      .send(data);

    expect(response.body).toEqual({ message: "Message is required" });
  });
});
