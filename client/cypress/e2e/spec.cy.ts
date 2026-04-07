/// <reference types="cypress" />

describe("template spec", () => {
  it("passes", () => {
    const randomEmail = `user${Math.floor(Math.random() * 10000)}@test.com`;
    cy.visit("http://localhost:3000/");
    cy.url().should("include", "/login");
    cy.visit("http://localhost:3000/register");
    cy.get('input[name="username"]').type(randomEmail);
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type("test");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/login");

    cy.get('input[name="email"]').type("bbaji.lamallem@gmail.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
  });
});