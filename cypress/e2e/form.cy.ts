describe("Components", () => {
  it("should submit the form and display toast notification", () => {
    cy.visit("localhost:3000/components"); // Replace with the actual path

    // Fill in form inputs
    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="password"]').type("testpassword");
    cy.get("[data-state=closed]").click();
    cy.contains("m@example.com").click();

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify toast notification
    cy.contains("You submitted the following values:");
    cy.contains("testuser");
    cy.contains("testpassword");
    cy.contains("m@example.com");
  });

  it("should display form validation errors", () => {
    cy.visit("localhost:3000/components"); // Replace with the actual path

    // Submit the form without filling in required fields
    cy.get('button[type="submit"]').click();

    // Verify form validation errors
    cy.contains("Username must be at least 2 characters.");
    cy.contains("Password must be at least 2 characters.");
    cy.contains("Please select an email to display.");
  });
});
