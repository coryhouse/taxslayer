/// <reference types="cypress" />

context("F1099s", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should delete Amazon 1099 when delete is clicked", () => {
    cy.findByLabelText("Delete Amazon 1099").click(); // click delete on the first record.
  });
});
