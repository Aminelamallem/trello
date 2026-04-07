// import supertest from "supertest";
// import app from "../../src/app";
// import databaseClient from "../../database/client";
// import type { Result, Rows } from "../../database/client";
// import jwt from "jsonwebtoken";
// import projectActions from "../../src/modules/project/projectController";
// import ProjectRepository from "../../src/modules/project/projectRepository";
// import type { ProjectDTO } from "../../src/dto/ProjectDTO";
// import type { IProject } from "../../src/interfaces/IProject";
// // Configuration du secret pour les tests
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

// describe("GET /api/projects/:uuid", () => {
//   it("should fetch a single project successfully", async () => {
//     // On simule une ligne de projet en base de données
//     const rows = [{ 
//       uuid: "exists-uuid", 
//       name: "Test Project", 
//       status: "public", 
//       createdBy: "user-123" 
//     }] as Rows;

//     jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []]);

//     const token = generateToken();

//     const response = await supertest(app)
//       .get("/api/projects/exists-uuid")
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toStrictEqual(rows[0]);
//   });

//   it("should return 404 if project does not exist", async () => {
//     const rows = [] as Rows; // Vide = pas de projet trouvé

//     jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []]);

//     const token = generateToken();

//     const response = await supertest(app)
//       .get("/api/projects/unknown-uuid")
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(404);
//     expect(response.body).toEqual({ message: "Project not found" });
//   });
// });

// describe("POST /api/projects", () => {
//   it("should create a new project successfully", async () => {
//     const result = { insertId: 1 } as Result;

//     jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []]);

//     const newProject = { 
//       name: "Nouveau Projet", 
//       description: "Ma description", 
//       status: "public" 
//     };

//     const token = generateToken();

//     const response = await supertest(app)
//       .post("/api/projects")
//       .set("Authorization", `Bearer ${token}`)
//       .send(newProject);

//     expect(response.status).toBe(201);
//     expect(response.body).toEqual({
//       message: "Project crée avec succés!",
//       userUuid: result.insertId,
//     });
//   });

//   it("should fail when fields are missing", async () => {
//     const incompleteProject = { name: "Seul le nom" };

//     const token = generateToken();

//     const response = await supertest(app)
//       .post("/api/projects")
//       .set("Authorization", `Bearer ${token}`)
//       .send(incompleteProject);

//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe("Tous les champs ne sont pas remplis");
//   });
// });


// // unit test

