// import supertest from "supertest";
// import app from "../../src/app";
// import databaseClient from "../../database/client";
// import type { Result, Rows } from "../../database/client";
// import jwt from "jsonwebtoken";
// import userActions from "../../src/modules/user/userController"; 
// import UserRepository from "../../src/modules/user/userRepository";

// import type { IUser } from "../../src/interfaces/IUser";
// import type { Request, Response, NextFunction } from "express";

// afterEach(() => {
//   jest.restoreAllMocks();
// });

// describe("GET /api/users", () => {
//   it("should fetch users successfully", async () => {
//     process.env.JWT_SECRET = "testsecret";

//     const rows = [] as Rows;

//     jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []]);

//     const token = jwt.sign(
//       { userUuid: "test-uuid", email: "test@test.com", username: "test", role: "user" },
//       process.env.JWT_SECRET
//     );

//     const response = await supertest(app)
//       .get("/api/users")
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toStrictEqual(rows);
//   });
// });

// describe("GET /api/users/:uuid", () => {
//   beforeAll(() => {
//     process.env.JWT_SECRET = "testsecret";
//   });

//   it("should fetch a single user successfully", async () => {
//     const rows = [{}] as Rows;

//     jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []]);

//     const token = jwt.sign(
//       { userUuid: "test-uuid", email: "test@test.com", username: "test", role: "user" },
//       process.env.JWT_SECRET as string
//     );

//     const response = await supertest(app)
//       .get("/api/users/9db693d9-0051-48bf-98be-3a876874c167")
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toStrictEqual(rows[0]);
//   });

//   it("should fail on invalid id", async () => {
//     const rows = [] as Rows;

//     jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []]);

//     const token = jwt.sign(
//       { userUuid: "test-uuid", email: "test@test.com", username: "test", role: "user" },
//       process.env.JWT_SECRET as string
//     );

//     const response = await supertest(app)
//       .get("/api/users/invalid-uuid")
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(404);
//     expect(response.body).toEqual({ message: "User not found", status: 404 });
//   });
// });

// describe("POST /api/users", () => {
//   it("should add a new user successfully", async () => {
//     const result = { insertId: 1 } as Result;

//     jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []]);

//     const fakeItem = { email: "foo", username: "foo", password: "foo" };

//     const response = await supertest(app).post("/api/auth/register").send(fakeItem);

//     expect(response.status).toBe(201);
//     expect(response.body).toEqual({
//       message: "Utilisateur crear avec succés!",
//       userId: result.insertId,
//     });
//   });

//   it("should fail on invalid request body", async () => {
//     const fakeUser = { username: "foo", password: "foo" };

//     const response = await supertest(app).post("/api/auth/register").send(fakeUser);

//     expect(response.status).toBe(400);
//     expect(response.body).toEqual({
//       message: "Tous les champs ne sont pas remplis",
//     });
//   });
// });


// describe("Test Unitaire : browse", () => {
//   test("browse appelle res.json", async () => {
//     // On crée des faux objets Express pour que la fonction puisse tourner sans serveur
//     const req = {} as Request;
//     const res = { json: jest.fn() } as unknown as Response; // jest.fn() permet de surveiller si res.json est appelé
//     const next = jest.fn() as NextFunction;
//     const mockData = [{ id: 1 }] as unknown as IUser[]; // Nos fausses données de test

//     // On dit à Jest d'intercepter l'appel au Repository et de renvoyer nos données de test
//     // Ça nous évite de toucher à la vraie base de données
//     const spy = jest.spyOn(UserRepository.prototype, "findAll").mockResolvedValue(mockData);

//     // On lance l'action du contrôleur
//     await userActions.browse(req, res, next);

//     // On vérifie que le contrôleur a bien renvoyé les données via res.json
//     expect(res.json).toHaveBeenCalledWith(mockData);

//     // On nettoie le "spy" pour ne pas polluer les autres tests du fichier
//     spy.mockRestore();
//   });
// });

// describe("Test Unitaire : read", () => {
//   test("read appelle res.json avec l'utilisateur trouvé", async () => {
//     // On simule une requête avec un paramètre UUID dans l'URL
//     const req = { params: { uuid: "123" } } as unknown as Request;
//     // On mocke aussi .status car certaines routes l'utilisent, mockReturnThis permet de chaîner (.status().json())
//     const res = { json: jest.fn(), status: jest.fn().mockReturnThis() } as unknown as Response;
//     const next = jest.fn() as NextFunction;
//     const mockUser = { id: 1, uuid: "123", username: "test" } as unknown as IUser;

//     // On simule que le repo trouve bien notre utilisateur
//     const spy = jest.spyOn(UserRepository.prototype, "findOneByUUId").mockResolvedValue(mockUser);

//     await userActions.read(req, res, next);

//     // Le contrôleur doit répondre avec l'utilisateur qu'on lui a fourni
//     expect(res.json).toHaveBeenCalledWith(mockUser);
//     spy.mockRestore();
//   });

//   test("read renvoie 404 si l'utilisateur n'existe pas", async () => {
//     // On teste le cas où l'UUID ne correspond à rien en base
//     const req = { params: { uuid: "inconnu" } } as unknown as Request;
//     const res = { 
//       status: jest.fn().mockReturnThis(), 
//       json: jest.fn() 
//     } as unknown as Response;
//     const next = jest.fn() as NextFunction;

//     // On force le Repository à renvoyer null (comme s'il n'avait rien trouvé)
//     // Le cast "as unknown as IUser" est juste là pour faire plaisir à TypeScript
//     const spy = jest.spyOn(UserRepository.prototype, "findOneByUUId").mockResolvedValue(null as unknown as IUser);

//     await userActions.read(req, res, next);

//     // On vérifie que le contrôleur a bien réagi avec une erreur 404
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: "User not found", status: 404 });
    
//     spy.mockRestore();
//   });
// });