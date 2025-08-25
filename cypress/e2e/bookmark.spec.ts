describe("Bookmark functionality", () => {
  it("allows user to bookmark and unbookmark a job", () => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    cy.visit("/");
    cy.get('[data-testid="bookmark-btn"]').first().click();
    cy.get('[data-testid="bookmark-btn"]').first().should("contain", "Bookmarked");
    cy.get('[data-testid="bookmark-btn"]').first().click();
    cy.get('[data-testid="bookmark-btn"]').first().should("contain", "Bookmark");
  });

  it("shows bookmarked jobs in /bookmarks page", () => {
    cy.visit("/bookmarks");
    cy.get('[data-testid="bookmark-btn"]').should("exist");
  });
});
