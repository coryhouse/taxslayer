/// <reference types="cypress" />

context("F1099s", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should delete a 1099 when delete is clicked", () => {
    cy.get("#1").click(); // click delete on the first record.
  });
});
