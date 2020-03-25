/// <reference types="cypress" />

context("F1099s", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display validation onBlur of empty fields", () => {
    cy.findByLabelText("EIN *")
      .focus()
      .blur();
    cy.findByLabelText("Employer *")
      .focus()
      .blur();
    cy.findByLabelText("Wages *")
      .focus()
      .blur();
    cy.findByLabelText("Withheld *")
      .focus()
      .blur();

    cy.findByText("EIN is required");
    cy.findByText("Employer is required");
    cy.findByText("Wages is required");
    cy.findByText("Withheld is required");
  });

  it("should add and delete a new record", () => {
    cy.findByLabelText("EIN *").type("test EIN");
    cy.findByLabelText("Employer *").type("test Employer");
    cy.findByLabelText("Wages *").type("100");
    cy.findByLabelText("Withheld *").type("200");
    cy.get("form").within(() => {
      // all queries we make inside of here will only look in the form.
      cy.findByText("Add 1099").click();

      // Now the form should be reset
      cy.findByLabelText("EIN *").should("have.value", "");
      cy.findByLabelText("Employer *").should("have.value", "");
      cy.findByLabelText("Wages *").should("have.value", "");
      cy.findByLabelText("Withheld *").should("have.value", "");
    });
    cy.findByLabelText("Delete test Employer 1099").click(); // click delete on the first record.
    cy.findByText("1099 Deleted");
  });
});
