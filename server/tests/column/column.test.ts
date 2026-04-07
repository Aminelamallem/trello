// import supertest from "supertest";
// import app from "../../src/app";
// import databaseClient from "../../database/client";
// import type { Result, Rows } from "../../database/client";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = "testsecret";
// process.env.JWT_SECRET = JWT_SECRET;

// afterEach(() => {
//   jest.restoreAllMocks();
// });

// const generateToken = () => {
//   return jwt.sign(
//     { userUuid: "user-123", email: "test@test.com" },
//     JWT_SECRET
//   );
// };

// describe("GET /api/columns/project/:projectUuid", () => {
//   it("should fetch all columns for a project successfully", async () => {
//     // 1. Mock de la vérification du projet (il existe)
//     const projectRows = [{ uuid: "proj-123" }] as Rows;
//     // 2. Mock des colonnes trouvées
//     const columnRows = [
//       { uuid: "col-1", name: "To Do", projectUuid: "proj-123" },
//       { uuid: "col-2", name: "Done", projectUuid: "proj-123" },
//     ] as Rows;

//     // Simulation des deux requêtes SQL successives
//     jest.spyOn(databaseClient, "query")
//       .mockResolvedValueOnce([projectRows, []]) // Première requête : check projet
//       .mockResolvedValueOnce([columnRows, []]); // Deuxième requête : get colonnes

//     const response = await supertest(app)
//       .get("/api/columns/project/proj-123")
//       .set("Authorization", `Bearer ${generateToken()}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveLength(2);
//     expect(response.body[0].name).toBe("To Do");
//   });

//   it("should return 404 if project does not exist", async () => {
//     jest.spyOn(databaseClient, "query").mockResolvedValueOnce([[] as Rows, []]);

//     const response = await supertest(app)
//       .get("/api/columns/project/invalid-proj")
//       .set("Authorization", `Bearer ${generateToken()}`);

//     expect(response.status).toBe(404);
//     expect(response.body.message).toBe("Project not found");
//   });
// });

// describe("POST /api/columns", () => {
//   it("should create a column successfully", async () => {
//     const projectRows = [{ uuid: "proj-123" }] as Rows;
//     const result = { insertId: 1 } as Result;

//     jest.spyOn(databaseClient, "query")
//       .mockResolvedValueOnce([projectRows, []]) // Check projet
//       .mockResolvedValueOnce([result, []]);      // Create colonne

//     const newColumn = { name: "En cours", projectUuid: "proj-123" };

//     const response = await supertest(app)
//       .post("/api/columns")
//       .set("Authorization", `Bearer ${generateToken()}`)
//       .send(newColumn);

//     expect(response.status).toBe(201);
//     expect(response.body).toEqual({
//       message: "Column created",
//       columnId: 1,
//     });
//   });

//   it("should return 400 if name is missing", async () => {
//     const response = await supertest(app)
//       .post("/api/columns")
//       .set("Authorization", `Bearer ${generateToken()}`)
//       .send({ projectUuid: "proj-123" }); // Pas de name

//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe("Name and project UUID are required");
//   });
// });
