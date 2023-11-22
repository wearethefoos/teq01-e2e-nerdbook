const user = require("../../fixtures/user.json");
const me = require("../../fixtures/me.json");

describe("Sign up", () => {
  beforeEach(() => {
    /**
     * Visit the sign up page
     *
     * Note that we can use only the path here, because we set the `baseUrl`
     * in the cypress config.
     */
    cy.visit("/signup");
  });

  it("should display the sign up page", () => {
    cy.get("h1").should("contain", "Sign up");
  });

  it("should display the sign up form", () => {
    cy.get("form").should("contain", "Name");
    cy.get("form").should("contain", "Password");
    cy.get("form").should("contain", "Email");
    cy.get("form").should("contain", "Confirm Password");
    cy.get("form").should("contain", "Sign Up");
  });

  it("should display an error when passwords don't match", () => {
    cy.get("input#Password").type("monkey");
    cy.get("input#Confirm-Password").type("bicycle");
    cy.get("#Confirm-Password-error").should(
      "contain",
      "Passwords do not match"
    );
  });

  it("should sign up a new user", () => {
    cy.get("input#Name").type(user.name);
    cy.get("input#Email").type(user.email);
    cy.get("input#Password").type(user.password);
    cy.get("input#Confirm-Password").type(user.password);

    /**
     * Intercept the POST request to the signup endpoint
     *
     * We can only sign up the same user once, so we can't try to sign up
     * as the same user every time we run the test. Instead, we intercept
     * the POST request to the signup endpoint and return a (fake) JWT token
     * to trick the app into thinking we've signed up successfully – and are
     * logged in.
     */
    cy.intercept("POST", "https://coders-network-api.herokuapp.com/signup", {
      jwt: "123",
    }).as("signUp");

    cy.intercept("GET", "https://coders-network-api.herokuapp.com/me", me).as(
      "getMe"
    );

    /**
     * Sign up the user
     *
     * Now that we can be sure we won't get an error from the real API, because
     * we intercept the requests above, we can click the sign up button.
     */
    cy.get("input#signupButton").click();

    /**
     * Which should take us to the home page.
     */
    cy.get("h1").should("contain", "Welcome to NerdBook!");
  });
});
