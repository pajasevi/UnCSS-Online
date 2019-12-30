
describe("Index page", () => {
  it('Visits the index page', () => {
    cy.visit('/');
  });

  it("should have HTML input", () => {
    cy.get("#inputHtml").should("have.length", 1);
  });

  it("should have CSS input", () => {
    cy.get("#inputCss").should("have.length", 1);
  });

  it("should have submit button", () => {
    cy.get("#submitButton").should("have.length", 1)
  });

  it("should have CSS output field", () => {
    cy.get("#outputCss").should("have.length", 1);
  });

  it("should uncss code properly", () => {
    cy.fixture('uncss.json').then(uncssData => {
      cy.get("#inputHtml").clear().invoke("val", uncssData.html).trigger('change');
      cy.get("#inputCss").clear().invoke("val", uncssData.css).trigger('change');

      cy.server(); // setup Cypress server
      cy.route({ url: "/api/uncss", method: "POST" }).as('postUncss'); // Listen to request

      cy.get("#submitButton").click(); // Submit form with button click

      cy.get("#submitButton").should("have.class", "button-loading"); // Observe that button has loading class

      cy.wait("@postUncss"); // wait for request to finish

      cy.get("#submitButton").should("not.to.have.class", "button-loading"); // Observe that button does not have loading class

      cy.get("#outputCss").should("contain", uncssData.outputCss); // Expect a response
    });
  });
});
