/// <reference types="cypress" />

context("F1099s", () => {
  it.only("should support editing a 1099", () => {
    cy.visit("http://localhost:3000/f1099s");
    cy.findByLabelText("Edit Amazon 1099").click();
    cy.findByText("Edit Amazon 1099"); // confirm header exists
    cy.findByLabelText("EIN *")
      .clear()
      .type("new Amazon EIN");
    cy.findByText("Save 1099").click();
    // Now I should be back on the grid page.
    cy.findByText("new Amazon EIN");

    // Great, if we got here, the edit worked. Now let's revert our edit
    cy.findByLabelText("Edit Amazon 1099").click();
    cy.findByLabelText("EIN *")
      .clear()
      .type("82-823838"); // NOTE, this matches mockData.js
    cy.findByText("Save 1099").click();

    // Now I'm back on the grid page, so assure the original is displaying again.
    cy.findByText("82-823838");
  });

  it("should display validation onBlur of empty fields", () => {
    cy.visit("http://localhost:3000/manage");
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
    cy.visit("http://localhost:3000/manage");
    cy.findByLabelText("EIN *").type("test EIN");
    cy.findByLabelText("Employer *").type("test Employer");
    cy.findByLabelText("Wages *").type("100");
    cy.findByLabelText("Withheld *").type("200");
    cy.get("form").within(() => {
      // all queries we make inside of here will only look in the form.
      cy.findByText("Add 1099").click();
    });
    // App should have redirected to the grid page, so delete button for new record should be visible now.
    cy.findByLabelText("Delete test Employer 1099").click(); // click delete on the first record.
    cy.findByText("1099 Deleted");
  });
});
