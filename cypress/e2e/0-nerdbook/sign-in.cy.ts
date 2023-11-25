const signInUser = require("../../fixtures/user.json");

describe("Log In", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display the login page", () => {
    cy.get("h1").should("contain", "Log in");
  });

  it("should display the log in form", () => {
    cy.get("form").should("contain", "Email");
    cy.get("form").should("contain", "Password");
    cy.get("form").should("contain", "Log in");
  });

  it("should log in as user", () => {
    cy.get("input#Email").type(signInUser.email);
    cy.get("input#Password").type(signInUser.password);
    cy.get("input#loginButton").click();
  });
});
