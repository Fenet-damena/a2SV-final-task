describe("Bookmark Jobs", () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit("http://localhost:3000");
  });

  it("should ask to login before bookmarking", () => {
    // Click the first bookmark icon
    cy.get('[data-testid="bookmark-btn"]').first().click();

    // Expect login message
    cy.contains("Please login to bookmark").should("exist");
  });

  it("should login and allow bookmarking", () => {
    // Simulate login by storing a fake token in localStorage
    window.localStorage.setItem("token", "dummy-token");

    // Reload after setting token
    cy.reload();

    // Click first bookmark
    cy.get('[data-testid="bookmark-btn"]').first().click();

    // Expect success toast/message
    cy.contains("Bookmarked").should("exist");
  });

  it("should display bookmarked jobs on Bookmarks page", () => {
    // Navigate to Bookmarks page
    cy.visit("http://localhost:3000/bookmarks");

    // Check that at least one job card is shown
    cy.get('[data-testid="job-card"]').should("exist");
  });
});
